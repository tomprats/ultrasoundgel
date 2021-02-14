class Post < ApplicationRecord
  include Published

  has_many :comments
  has_rich_text :content
  belongs_to :episode

  validates_presence_of :title
  validate :episode_check, if: :episode_id_changed?

  on_publish do |record|
    record.validates_presence_of :episode
    record.validate :publishable
  end

  on_unpublish do |record|
    record.validate :unpublishable
  end

  before_validation :set_uid, on: :create
  before_save :publish, if: -> (post){ post.published_at_changed? && post.published_at }
  before_destroy :unpublished!

  to_html :text

  def current_content
    content.present? ? content.body.to_html : text_to_html
  end

  def tag_list
    tags && tags.split(",").collect(&:strip)
  end

  def publishable
    return unless episode
    old_published_at = episode.published_at
    episode.published_at = published_at
    errors.add(:episode, "is not ready to be published") unless episode.valid?
    episode.published_at = old_published_at
  end

  def publish
    episode.update(published_at: published_at) unless episode.published_before?(published_at)
  end

  def publishing?
    published_at.present? || episode.try(:publishing?)
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
    errors.add(:post, "is already publishing") if published_at.present?
    errors.add(:episode, "is already publishing") if episode.try(:publishing?)
    throw :abort if errors.any?
  end

  def unpublishable
    return if !published? && !episode.try(:publishing?)

    errors.add(:published_at, "cannot be changed if published or episode is publishing")
  end

  def episode_check
    return if Episode.find_by(id: episode_id_was).blank?
    return errors.add(:episode, "cannot be changed if published") if published?
    return if Episode.find_by(id: episode_id).present?
    errors.add(:episode, "cannot be removed if publishing") if publishing?
  end
end
