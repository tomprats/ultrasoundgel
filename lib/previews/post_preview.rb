class PostPreview < ActionMailer::Preview
  include Rails.application.routes.url_helpers

  def comment_email
    PostMailer.comment_email(user, root_url + post.episode.number.to_s)
  end

  def publish_email
    PostMailer.publish_email(user, post)
  end

  def unpublish_email
    PostMailer.unpublish_email(user)
  end

  private

  def post
    Post.published.last
  end

  def user
    User.find_by(email: "tprats108@gmail.com")
  end
end
