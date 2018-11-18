class UserMailer < ApplicationMailer
  def forgot_password(user)
    @user = user
    @profile_url = edit_user_url(token: user.token)

    mail(to: @user.email, subject: "Ultrasound GEL - Forgot Password")
  end
end
