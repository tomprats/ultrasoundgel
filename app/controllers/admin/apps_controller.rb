class Admin::AppsController < Admin::ApplicationController
  def update
    if app.update(app_params)
      redirect_to({action: :index}, success: "App updated")
    else
      render :index, warning: app.errors.full_messages.join(", ")
    end
  end

  private

  def app_params
    if params.dig(:app, :public_tags)&.is_a?(String)
      params[:app][:public_tags] = params.dig(:app, :public_tags)&.split(",")&.collect(&:strip)
    end

    params.require(:app).permit(
      :share_title, :share_description,
      :share_image, :navbar_image,
      :announcements, :resources,
      :twitter, :facebook, :instagram,
      :contact_email, :google_analytics_code,
      public_tags: []
    )
  end
end
