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

  # TODO: Eventually
=begin
    Rails.cache.fetch("app-channel", expires_in: 5.minutes) do
      channel = Channel.published.last
      channel.as_json(only: [:google_link, :itunes_link]).merge(
        description: channel.description.body.to_html,
        image: channel.image.attached? ? url_for(channel.image) : nil
      )
    end
=end
  def channel_as_json
    Rails.cache.fetch("app-channel", expires_in: 5.minutes) do
      channel = Channel.published.last
      channel.as_json(only: [:google_link, :itunes_link, :summary]).merge(
        image: channel.image&.file&.url
      )
    end
  end

  def current_user
    @current_user ||= User.find_by(id: session[:current_user_id])
  end
  helper_method :current_user

  def environment
    render json: {
      channel: channel_as_json,
      pages: pages_as_json,
      sections: sections_as_json,
      user: user_as_json(current_user)
    }
  end

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

  def pages_as_json
    Rails.cache.fetch("app-pages", expires_in: 5.minutes) do
      Page.active.as_json(methods: [:text_to_html], only: [:name, :path, :rank, :template])
    end
  end

  def sections_as_json
    Rails.cache.fetch("app-sections", expires_in: 5.minutes) do
      Section.all.as_json(
        include: {contents: {methods: [:value], only: [:kind, :name]}},
        only: [:name]
      )
    end
  end

  def user_as_json(user)
    return if user.blank?

    user.as_json(
      only: [
        :admin,
        :email,
        :first_name,
        :id,
        :last_name,
        :post_notifications
      ]
    ).merge({image: user.image&.file&.url})
    # TODO: Eventually
=begin
    ).merge({image: user.image.attached? && url_for(user.image)})
=end
  end

  private

  def auth_with_token
    return if params[:token].blank?

    user = Token.find_by(uuid: params[:token])&.user
    session[:current_user_id] = user.id if user
  end
end
