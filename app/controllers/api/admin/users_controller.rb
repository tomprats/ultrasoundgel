class Api::Admin::UsersController < Api::Admin::ApplicationController
  def index
    users = User.order(admin: :desc, created_at: :desc).all

    render json: {users: users_as_json(users)}
  end

  def show
    user = User.find(params[:id])

    render json: {user: user_as_json(user)}
  end

  def update
    user = User.find(params[:id])

    return render json: {
      message: "Not today Satan",
      success: false
    } if user.tom? && current_user.id != user.id

    if user.update(user_params)
      render json: {message: "#{user.name} updated", success: true}
    else
      render json: {message: user.errors.full_messages.join(", "), success: false}
    end
  end

  def destroy
    user = User.find(params[:id])

    return render json: {
      message: "Not today Satan",
      success: false
    } if user.tom? && current_user.id != user.id

    if user.destroy
      render json: {message: "#{user.name} deleted", success: true}
    else
      render json: {message: "There was an issue", success: false}
    end
  end

  private

  def user_params
    params.require(:user).permit(
      :admin,
      :email,
      :first_name,
      :image,
      :last_name,
      :post_notifications
    )
  end

  def user_as_json(user)
    user.as_json(only: [
      :admin,
      :created_at,
      :email,
      :first_name,
      :id,
      :last_name,
      :post_notifications
    ]).merge({image: user.current_image})
  end

  def users_as_json(users)
    users.as_json(only: [
      :admin,
      :created_at,
      :email,
      :first_name,
      :id,
      :last_name
    ])
  end
end
