class Admin::ApplicationController < ApplicationController
  before_action :require_user!
  before_action :require_admin!

  def require_admin!
    redirect_to home_path unless current_user.admin
  end
end
