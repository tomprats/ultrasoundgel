class PodcastEpisode < ApplicationRecord
  validates_presence_of :audio, :image, :uid,
    :title, :subtitle, :author, :summary

  belongs_to :audio
  belongs_to :image
  has_one :post

  default_scope { order(:published_at) }
  scope :unpublished, -> { where(published_at: nil) }
  scope :published, -> { where("published_at >= ?", DateTime.now) }
  scope :scheduled, -> { where("published_at < ?", DateTime.now) }

  date_from :published_at
end
