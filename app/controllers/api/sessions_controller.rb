class Api::SessionsController < Api::ApplicationController
  def create
    email = params.dig(:user, :email) || ""
    user = User.find_by(email: email.strip.downcase)

    if user&.password_digest && user.authenticate(params.dig(:user, :password))
      session[:current_user_id] = user.id

      render json: {
        message: "Welcome #{user.first_name}!",
        success: true,
        user: user_as_json(user)
      }
    else
      render json: {success: false, message: "Invalid email/password combination"}
    end
  end

  def destroy
    session.clear

    render json: {success: true, message: "Goodbye"}
  end

  def forgot_password
    email = params[:email]&.strip&.downcase

    if email.blank?
      render json: {success: false, message: "Please enter a valid email address"}
    else
      user = User.find_by(email: email)
      UserMailer.forgot_password(user).deliver_now if user

      render json: {
        success: true,
        message: "Please check #{email} for a link to reset your password"
      }
    end
  end
end
