class Admin::UsersController < AdminController
  def index
    @users = User.all
  end

  def edit
    @user = User.find(params[:id])
    @users = User.all
    render :index
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      redirect_to({ action: :index }, success: "#{@user.name} updated")
    else
      @users = User.all
      render :index, warning: @user.errors.full_messages.join(", ")
    end
  end

  def destroy
    @user = User.find(params[:id])
    if @user.email == "tprats108@gmail.com"
      redirect_to({ action: :index }, danger: " You can't delete the creator")
    else
      @user.destroy
      redirect_to({ action: :index }, danger: "#{@user.name} deleted")
    end
  end

  private
  def user_params
    params.require(:user).permit(
      :admin, :email,
      :first_name, :last_name,
      :image
    )
  end
end
