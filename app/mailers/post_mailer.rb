class PostMailer < ApplicationMailer
  def publish_email(user, post)
    @user = user
    @post = post
    @post_url = "#{root_url}#{post.episode.number}"

    mail(to: @user.email, subject: "US GEL - #{@post.episode.title}")
  end

  def unpublish_email(user, title = nil)
    @user = user
    @title = title

    mail(to: @user.email, subject: "US GEL - Oops")
  end
end
