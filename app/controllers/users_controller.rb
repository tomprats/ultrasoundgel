class UsersController < ApplicationController
  before_action :require_user!, except: [:create, :forgot_password]

  def create
    @user = User.new(user_params)
    if @user.save
      session[:current_user_id] = @user.id
      redirect_to root_path, success: "Signed Up!"
    else
      render "sessions/new", warning: @user.errors.full_messages.join(", ")
    end
  end

  def edit
    @user = current_user
  end

  def update
    @user = current_user
    if @user.update(user_params)
      redirect_back success: "Profile Updated!"
    else
      render "sessions/new", warning: @user.errors.full_messages.join(", ")
    end
  end

  def forgot_password
    email = params[:email]&.strip&.downcase
    return redirect_back warning: "Please enter a valid email address" if email.blank?

    user = User.find_by(email: email)
    UserMailer.forgot_password(user).deliver_now if user
    redirect_back success: "Please check #{email} for a link to reset your password"
  end

  private

  def user_params
    params.require(:user).permit(
      :email, :first_name, :last_name,
      :password, :password_confirmation,
      :image, :post_notifications
    )
  end
end
