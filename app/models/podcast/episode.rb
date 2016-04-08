class Episode < ApplicationRecord
  include Published

  validates_presence_of :title, :uid
  validate :channel_check, if: :channel_id_changed?

  on_publish do |record|
    record.validates_presence_of :channel, :audio, :image,
      :subtitle, :author, :summary
    record.validate :publishable
  end

  on_unpublish do |record|
    record.validate :never_published
  end

  belongs_to :channel
  belongs_to :audio, class_name: AudioUpload
  belongs_to :image, class_name: ImageUpload
  has_one :post

  before_validation :set_uid, on: :create
  before_save :publish, if: -> (episode) { episode.published_at_changed? && episode.published_at }
  before_destroy :never_published

  def publishable
    old_published_at = channel.published_at
    channel.published_at = published_at
    errors.add(:channel, "is not ready to be published") unless channel.valid?
    channel.published_at = old_published_at
  end

  def publish
    channel.update(published_at: published_at) unless channel.published_before?(published_at)
  end

  def to_param
    uid
  end

  private
  def set_uid
    self.uid = SecureRandom.urlsafe_base64
    set_uid if self.class.where(uid: self.uid).exists?
  end

  def never_published
    !published?
  end

  def channel_check
    errors.add(:channel, "cannot be changed if publish has been set") if published_at.present?
  end
end
