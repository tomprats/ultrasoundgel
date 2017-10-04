class Admin::UploadsController < AdminController
  def index
    @upload = Upload.new
  end

  def create
    @upload = Upload.new(upload_params)
    if @upload.save
      redirect_to({ action: :index }, success: "#{@upload.name} created")
    else
      render :index, warning: @upload.errors.full_messages.join(", ")
    end
  end

  def destroy
    @upload = Upload.find_by(uid: params[:uid])
    if @upload.destroy
      redirect_to({ action: :index }, danger: "#{@upload.name} deleted")
    else
      redirect_to({ action: :index }, warning: @upload.errors.full_messages.join(", "))
    end
  end

  private
  def upload_params
    params.require(:upload).permit(:name, :file)
  end
end
