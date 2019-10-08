class PostPreview < ActionMailer::Preview
  include Rails.application.routes.url_helpers

  def comment_preview
    PostMailer.comment_email(user, home_url + post.episode.number.to_s)
  end

  def send_preview
    PostMailer.publish_email(user, post)
  end

  private

  def post
    Post.published.last
  end

  def user
    User.find_by(email: "tprats108@gmail.com")
  end
end
