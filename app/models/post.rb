class Post < ApplicationRecord
  include Published

  has_many :comments
  belongs_to :episode

  validates_presence_of :title
  validate :episode_check, if: :episode_id_changed?

  on_publish do |record|
    record.validates_presence_of :episode
    record.validate :publishable
  end

  on_unpublish do |record|
    record.validate :never_published
  end

  before_validation :set_uid, on: :create
  before_save :publish, if: -> (post) { post.published_at_changed? && post.published_at }
  before_destroy :never_published

  to_html :text

  def tag_list
    tags && tags.split(",").collect(&:trim)
  end

  def publishable
    if episode
      old_published_at = episode.published_at
      episode.published_at = published_at
      errors.add(:episode, "is not ready to be published") unless episode.valid?
      episode.published_at = old_published_at
    end
  end

  def publish
    episode.update(published_at: published_at) unless episode.published_before?(published_at)
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
    !published? && !episode.published?
  end

  def episode_check
    errors.add(:episode, "cannot be changed if publish has been set") if published_at.present?
  end
end
