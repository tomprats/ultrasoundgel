class Api::ProfilesController < Api::ApplicationController
  before_action :require_user!, except: :create

  def create
    user = User.new(user_params)

    if user.save
      session[:current_user_id] = user.id

      render json: {
        message: "Welcome #{user.first_name}!",
        success: true,
        user: user_as_json(user)
      }
    else
      render json: {success: false, message: user.errors.full_messages.join(", ")}
    end
  end

  def update
    user = current_user

    if user.update(user_params)
      render json: {
        message: "Profile Updated!",
        success: true,
        user: user_as_json(user)
      }
    else
      render json: {success: false, message: user.errors.full_messages.join(", ")}
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
