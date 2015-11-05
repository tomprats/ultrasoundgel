class AdminController < ApplicationController
  before_action :require_user!
  before_action :require_admin!

  def require_user!
    not_found unless current_user
  end

  def require_admin!
    redirect_to home_path unless current_user.admin
  end
end
