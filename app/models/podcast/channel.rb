class Channel < ApplicationRecord
  include Published

  validates_presence_of :title

  on_publish do |record|
    record.validates_presence_of :image, :subtitle,
      :author, :link, :owner_name, :owner_email, :summary
  end

  on_unpublish do |record|
    record.validate :unpublishable
  end

  belongs_to :image, class_name: "ImageUpload"
  has_many :episodes
  has_many :posts, through: :episodes

  before_validation :set_uid, on: :create
  before_destroy :unpublished!

  def category_list
    categories ? categories.split(",").collect(&:strip) : []
  end

  def episodes_publishing?
    episodes.where.not(published_at: nil).exists?
  end

  def publishing?
    published_at.present? || episodes_publishing?
  end

  def to_param
    uid
  end

  private

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
