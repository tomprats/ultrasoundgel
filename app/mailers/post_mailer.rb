class PostMailer < ApplicationMailer
  def comment_email(user, url)
    @user = user
    @post_url = url

    mail(to: @user.email, subject: "Ultrasound GEL - Comment Notification")
  end

  def publish_email(user, post)
    @user = user
    @post = post
    @post_url = "#{home_url}#{post.episode.number}"

    mail(to: @user.email, subject: "US GEL - #{@post.episode.title}")
  end
end
