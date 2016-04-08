class CommentsController < ApplicationController
  def create
    @comment = Comment.new(comment_params)
    @post = @comment.post

    if current_user
      recaptcha = true
      @comment.user = current_user
    else
      recaptcha = verify_recaptcha(
        model: @comment,
        response: params[:recaptcha]
      )
      flash.delete(:recaptcha_error)
    end

    if recaptcha && @comment.save
      current_user && current_user.comment_notifications.find_or_create_by(post_id: @post.id)
      User.joins(:comment_notifications).where(comment_notifications: { post_id: @post.id }).each do |user|
        PostMailer.comment_email(user, post_url(@post)).deliver_now
      end
      redirect_to @post, success: "Comment Saved"
    else
      redirect_to @post, warning: @comment.errors.full_messages.join(", ")
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    if current_user && (current_user == @comment.user || current_user.admin)
      @comment.update(active: false)
      redirect_to :back, danger: "Comment Removed"
    else
      redirect_to :back, danger: "You can't do that"
    end
  end

  private
  def comment_params
    params.require(:comment).permit(
      :post_id, :text, :anonymous
    )
  end
end
