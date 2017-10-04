class Episode < ApplicationRecord
  include Published

  validates_presence_of :title, :uid
  validate :channel_check, if: :channel_id_changed?
  validate :audio_check, if: :audio_id_changed?

  on_publish do |record|
    record.validates_presence_of :channel, :audio, :image,
      :subtitle, :author, :summary
    record.validate :publishable
  end

  on_unpublish do |record|
    record.validate :unpublishable
  end

  belongs_to :channel
  belongs_to :audio, class_name: "AudioUpload"
  belongs_to :image, class_name: "ImageUpload"
  has_one :post

  before_validation :set_uid, on: :create
  before_save :publish, if: -> (episode) { episode.published_at_changed? && episode.published_at }
  before_destroy :never_published!
  after_save :update_tags, if: :saved_change_to_audio_id?
  after_destroy :remove_tag

  def self.search(value)
    result = left_joins(:post)
    value.split(",").collect(&:strip).each do |v|
      result = result.where("episodes.title ILIKE :search
        OR posts.tags ILIKE :search
        OR posts.title ILIKE :search",
        search: "%#{v}%"
      )
    end
    result
  end

  def publishable
    old_published_at = channel.published_at
    channel.published_at = published_at
    errors.add(:channel, "is not ready to be published") unless channel.valid?
    channel.published_at = old_published_at
  end

  def publish
    channel.update(published_at: published_at) unless channel.published_before?(published_at)
  end

  def publishing?
    published_at.present?
  end

  def to_param
    uid
  end

  private
  def set_uid
    self.uid = SecureRandom.urlsafe_base64
    set_uid if self.class.where(uid: self.uid).exists?
  end

  def never_published!
    throw :abort if publishing?
  end

  def unpublishable
    errors.add(:published_at, "cannot be changed if published") if published?
  end

  def audio_check
    return errors.add(:audio, "cannot be changed if published") if published?
    errors.add(:audio, "cannot be removed if publishing") if publishing?
  end

  def channel_check
    errors.add(:channel, "cannot be changed if publishing") if publishing?
  end

  def update_tags
    old_id, new_id = saved_change_to_audio_id
    remove_tag(old_id)
    add_tag(new_id)
  end

  def add_tag(upload_id)
    return unless upload_id
    return unless upload = AudioUpload.find_by(id: upload_id)
    upload.add_tag
  end

  def remove_tag(upload_id = audio_id)
    return unless upload_id
    return unless upload = AudioUpload.find_by(id: upload_id)
    return unless Episode.where(audio_id: upload_id).count.zero?
    upload.remove_tag
  end
end
