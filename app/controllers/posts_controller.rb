class PostsController < ApplicationController
  before_action :set_post

  def subscribe
    current_user.comment_notifications.find_or_create_by(post_id: @post.id)
    redirect_to :back, success: "Subscribed"
  end

  def unsubscribe
    current_user.comment_notifications.find_by(post_id: @post.id).try(:destroy)
    redirect_to :back, danger: "Unsubscribed"
  end

  private
  def set_post
    @post = Post.find_by(uid: params[:uid])
  end
end
