class PostMailer < ApplicationMailer
  def publish_email(user, url)
    @user = user
    @post_url = url

    mail(to: @user.email, subject: "Ultrasound GEL - Post Notification")
  end

  def comment_email(user, url)
    @user = user
    @post_url = url

    mail(to: @user.email, subject: "Ultrasound GEL - Comment Notification")
  end
end
