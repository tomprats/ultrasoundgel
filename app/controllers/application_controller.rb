class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  add_flash_types :success, :info, :warning, :danger

  def app
    @app ||= App.default
  end
  helper_method :app

  def current_user
    @current_user ||= User.find_by(id: session[:current_user_id])
  end
  helper_method :current_user

  def pages
    @active_pages ||= Page.active
  end
  helper_method :pages

  def not_found
    raise ActionController::RoutingError.new("Not Found")
  end

  def redirect_back(options = {})
    options[:fallback_location] ||= home_path
    super(options)
  end

  def require_user!
    if params[:token]
      token = Token.find_by(uuid: params[:token])
      session[:current_user_id] = token&.user&.id
    end

    not_found unless current_user
  end
end
