class CommentNotification < ApplicationRecord
  belongs_to :post
  belongs_to :user

  validates_presence_of :post, :user
  validates_uniqueness_of :post_id, scope: :user_id
end
