class Admin::AppsController < AdminController
  def update
    if app.update(app_params)
      redirect_to({ action: :index }, success: "App updated")
    else
      render :index, warning: app.errors.full_messages.join(", ")
    end
  end

  private
  def app_params
    params.require(:app).permit(
      :share_title, :share_description,
      :share_image_id, :navbar_image_id,
      :announcements, :resources,
      :twitter, :facebook, :instagram,
      :contact_email, :google_analytics_code
    )
  end
end
