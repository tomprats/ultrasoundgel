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
  before_destroy :never_published!

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
    set_uid if self.class.where(uid: self.uid).exists?
  end

  def never_published!
    throw :abort if publishing?
  end

  def unpublishable
    errors.add(:published_at, "cannot be changed if published or episodes are publishing") if published? || episodes_publishing?
  end
end
