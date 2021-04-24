class Channel < ApplicationRecord
  include Published
  has_rich_text :description
  has_one_attached :image

  # TODO: Add validations from image upload
  validates_presence_of :title

  on_publish do |record|
    record.validates_presence_of(
      :subtitle,
      :author,
      :link,
      :owner_name,
      :owner_email
    )
    record.validate :description_ready!
    record.validate :image_ready!
  end

  on_unpublish do |record|
    record.validate :unpublishable
  end

  belongs_to :legacy_image, class_name: "ImageUpload", optional: true
  has_many :episodes

  before_validation :set_uid, on: :create
  before_destroy :unpublished!

  def category_list
    categories ? categories.split(",").collect(&:strip) : []
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

  def current_image(proxy: false)
    return legacy_image&.file&.url unless image.attached?
    return image.url unless proxy

    Rails.application.routes.url_helpers.rails_storage_proxy_path(image)
  end

  def episodes_publishing?
    episodes.where.not(published_at: nil).exists?
  end

  def image_extension
    return image.blob.filename.extension if image.attached?
    legacy_image.extension if legacy_image.present?
  end

  def publishing?
    published_at.present? || episodes_publishing?
  end

  def to_param
    uid
  end

  private

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
    errors.add(:channel, "is already publishing") if published_at.present?
    errors.add(:episodes, "are already publishing") if episodes_publishing?
    throw :abort if errors.any?
  end

  def unpublishable
    return if !published? && !episodes_publishing?

    errors.add(:published_at, "cannot be changed if published or episodes are publishing")
  end
end
