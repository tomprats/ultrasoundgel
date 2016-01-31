class PodcastChannel < ApplicationRecord
  validates_presence_of :image, :title, :subtitle,
    :author, :link, :owner_name, :owner_email, :summary

  belongs_to :image

  default_scope { order(:published_at) }
  scope :unpublished, -> { where(published_at: nil) }
  scope :published, -> { where("published_at >= ?", DateTime.now) }
  scope :scheduled, -> { where("published_at < ?", DateTime.now) }

  date_from :published_at

  def category_list
    categories && categories.split(",").collect(&:trim)
  end
end
