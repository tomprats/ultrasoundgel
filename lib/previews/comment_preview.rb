class CommentPreview < ActionMailer::Preview
  include Rails.application.routes.url_helpers

  def case_notification
    CommentMailer.notification(user, Case.published.last)
  end

  def post_notification
    CommentMailer.notification(user, post)
  end

  private

  def post
    Post.published.last
  end

  def user
    User.find_by(email: "tprats108@gmail.com")
  end
end
