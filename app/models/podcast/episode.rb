class Episode < ApplicationRecord
  include Published
  has_one_attached :audio
  has_rich_text :description
  has_one_attached :image
  has_one :action_text_rich_text, as: :record, class_name: "ActionText::RichText"

  # TODO: Add validations from audio upload
  # TODO: Add validations from image upload
  validates_presence_of :title, :uid
  validate :channel_check, if: :channel_id_changed?

  on_publish do |record|
    record.validates_presence_of(
      :author,
      :channel,
      :subtitle
    )
    record.validate :audio_ready!
    record.validate :description_ready!
    record.validate :image_ready!
    record.validate :publishable
  end

  on_unpublish do |record|
    record.validate :unpublishable
  end

  belongs_to :channel
  belongs_to :legacy_audio, class_name: "AudioUpload", optional: true
  belongs_to :legacy_image, class_name: "ImageUpload", optional: true
  has_one :post

  before_validation :set_uid, on: :create
  before_save :publish, if: -> (episode){ episode.published_at_changed? && episode.published_at }
  before_destroy :unpublished!

  def self.search(value)
    result = left_joins(:post)
    sql = <<-SQL
      episodes.title ILIKE :search
      OR array_to_string(posts.public_tags, ',') ILIKE :search
      OR posts.tags ILIKE :search
      OR posts.title ILIKE :search
    SQL
    value.split(",").collect(&:strip).each do |v|
      result = result.where(sql, search: "%#{v}%")
    end
    result
  end

  def audio_duration
    return audio.blob.metadata[:duration]&.to_i if audio.attached?
    legacy_audio.duration_time if legacy_audio.present?
  end

  def audio_extension
    return audio.blob.filename.extension if audio.attached?
    legacy_audio.extension if legacy_audio.present?
  end

  def audio_size
    return audio.blob.byte_size if audio.attached?
    legacy_audio.size if legacy_audio.present?
  end

  def audio_type
    return audio.blob.content_type if audio.attached?
    legacy_audio.content_type if legacy_audio.present?
  end

  # TODO: This
  def current_audio
    audio.attached? ? audio.url : legacy_audio&.file&.url
  end

  def current_description
    current_description_html
  end

  def current_description_html
    description.present? ? description.body.to_html : summary
  end

  def current_description_text
    description.present? ? description.body.to_plain_text : summary
  end

  # TODO: This
  def current_image
    image.attached? ? image.url : legacy_image&.file&.url
  end

  def image_extension
    return image.blob.filename.extension if image.attached?
    legacy_image.extension if legacy_image.present?
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

  def audio_ready!
    errors.add(:audio, :blank) if current_audio.blank?
  end

  def description_ready!
    errors.add(:description, :blank) if current_description.blank?
  end

  def image_ready!
    errors.add(:image, :blank) if current_image.blank?
  end

  def set_uid
    self.uid = SecureRandom.urlsafe_base64
    set_uid if self.class.where(uid: uid).exists?
  end

  def unpublished!
    errors.add(:episode, "is already publishing") if publishing?
    throw :abort if errors.any?
  end

  def unpublishable
    errors.add(:published_at, "cannot be changed if published") if published?
  end
end
