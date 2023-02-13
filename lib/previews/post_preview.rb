class PostPreview < ActionMailer::Preview
  include Rails.application.routes.url_helpers

  def publish_email
    PostMailer.publish_email(user, post)
  end

  def unpublish_email
    PostMailer.unpublish_email(user)
  end

  def unpublish_email_with_title
    PostMailer.unpublish_email(user, "Inclusion in POCUS Part 2")
  end

  private

  def post
    Post.published.last
  end

  def user
    User.find_by(email: "tprats108@gmail.com")
  end
end
