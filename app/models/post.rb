class Post < ApplicationRecord
  validates_presence_of :title

  belongs_to :podcast_episode

  default_scope { order(:published_at) }
  scope :unpublished, -> { where(published_at: nil) }
  scope :published, -> { where("published_at >= ?", DateTime.now) }
  scope :scheduled, -> { where("published_at < ?", DateTime.now) }

  date_from :published_at

  def tag_list
    tags && tags.split(",").collect(&:trim)
  end
end
