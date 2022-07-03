class Comment < ApplicationRecord
  belongs_to :commentable, polymorphic: true
  belongs_to :user, optional: true

  validates_presence_of :text

  default_scope{ where(active: true).order(:created_at) }

  def followers
    User.joins(:comment_notifications).where(
      comment_notifications: {
        comment_notificationable_id: commentable_id,
        comment_notificationable_type: commentable_type
      }
    )
  end

  def image
    i = user&.current_image_thumbnail unless anonymous
    i || "/logo.jpg"
  end

  def name
    n = user&.name unless anonymous
    n || "Anonymous"
  end
end
