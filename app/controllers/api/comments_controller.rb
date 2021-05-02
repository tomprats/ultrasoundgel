class Api::CommentsController < Api::ApplicationController
  def create
    comment = Comment.new(comment_params)
    post = comment.post

    if current_user
      recaptcha = true
      comment.user = current_user
    else
      recaptcha = verify_recaptcha(model: comment, response: params.dig(:comment, :recaptcha))
    end

    if recaptcha && comment.save
      current_user && current_user.comment_notifications.find_or_create_by(post_id: post.id)

      User.joins(:comment_notifications).where(
        comment_notifications: {post_id: post.id}
      ).each do |user|
        PostMailer.comment_email(user, post_url(post)).deliver_later
      end

      render json: {
        comments: comments_as_json(comment.post.comments),
        message: "Comment Saved",
        success: true
      }
    else
      render json: {success: false, message: comment.errors.full_messages.join(", ")}
    end
  end

  def destroy
    comment = Comment.find(params[:id])
    allowed = current_user && (current_user == comment.user || current_user.admin)
    render json: {success: false, message: "You can't do that"} unless allowed

    if comment.destroy
      render json: {
        comments: comments_as_json(comment.post.comments),
        message: "Comment Removed",
        success: true
      }
    else
      render json: {success: false, message: "Something went wrong"}
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:post_id, :text, :anonymous)
  end
end
