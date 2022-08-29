class Api::PostsController < Api::ApplicationController
  include PostConcerns

  before_action :set_record

  def show
    render json: {post: post_as_json(@record)}
  end

  def subscribe
    render json: {success: false, message: "No one's home"} if current_user.blank?

    current_user.comment_notifications.find_or_create_by(comment_notificationable: @record)

    render json: {success: true, message: "Subscribed"}
  end

  def unsubscribe
    render json: {success: false, message: "No one's home"} if current_user.blank?

    current_user.comment_notifications.find_by(comment_notificationable: @record).try(:destroy)

    render json: {success: true, message: "Unsubscribed"}
  end

  private

  def set_record
    @record = Post.find_by!(uid: params[:uid])
  end
end
