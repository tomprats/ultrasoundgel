class CommentNotification < ApplicationRecord
  belongs_to :comment_notificationable, polymorphic: true
  belongs_to :user

  validates_presence_of :user
  validates_uniqueness_of :user_id, scope: [:comment_notificationable_id, :comment_notificationable_type]
end
