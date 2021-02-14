class ApplicationController < ActionController::Base
  before_action :auth_with_token

  def app
    @app ||= App.default
  end
  helper_method :app

  def authenticate
    return if current_user

    if request.format.json?
      render(json: {}, status: :unauthorized)
    else
      render(html: "", status: :unauthorized, layout: "application")
    end
  end

  def authenticate_admin
    return if current_user&.admin

    if request.format.json?
      render(json: {}, status: :unauthorized)
    else
      render(html: "", status: :unauthorized, layout: "application")
    end
  end

  def current_user
    @current_user ||= User.find_by(id: session[:current_user_id])
  end
  helper_method :current_user

  def not_found
    raise ActionController::RoutingError.new("Not Found")
  end

  def redirect_back(options = {})
    options[:fallback_location] ||= home_path
    super(options)
  end

  def pages
    @active_pages ||= Page.active
  end
  helper_method :pages

  def require_user!
    if params[:token]
      token = Token.find_by(uuid: params[:token])
      session[:current_user_id] = token&.user&.id
    end

    not_found unless current_user
  end

  private

  def auth_with_token
    return if params[:token].blank?

    user = Token.find_by(uuid: params[:token])&.user
    session[:current_user_id] = user.id if user
  end
end
