class Channel < ApplicationRecord
  include Published

  validates_presence_of :title

  on_publish do |record|
    record.validates_presence_of :image, :subtitle,
      :author, :link, :owner_name, :owner_email, :summary
  end

  on_unpublish do |record|
    record.validate :never_published
  end

  belongs_to :image, class_name: ImageUpload
  has_many :episodes
  has_many :posts, through: :episodes

  before_destroy :never_published

  def category_list
    categories && categories.split(",").collect(&:trim)
  end

  def never_published
    !published? && !episodes.where.not(published_at: nil).exists?
  end
end
