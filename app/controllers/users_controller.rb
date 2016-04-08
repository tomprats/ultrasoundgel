class UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      session[:current_user_id] = @user.id
      redirect_to home_path, success: "Signed Up!"
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
      redirect_to :back, success: "Profile Updated!"
    else
      render "sessions/new", warning: @user.errors.full_messages.join(", ")
    end
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
