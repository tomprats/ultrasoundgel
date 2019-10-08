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
    @image_url = episode_image_url(@post.episode.uid, format: @post.episode.image.extension)

    mail(to: @user.email, subject: "Ultrasound GEL - Post Notification")
  end
end
