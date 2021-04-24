class UserMailer < ApplicationMailer
  def forgot_password(user)
    @user = user
    @profile_url = profile_url(token: user.token)

    mail(to: @user.email, subject: "Ultrasound GEL - Forgot Password")
  end
end
