class Admin::UploadsController < AdminController
  def index
    @upload = Upload.new
  end

  def edit
    @upload = Upload.find(params[:id])

    render :index
  end

  def create
    @upload = Upload.new(upload_params)
    if @upload.save
      redirect_to({ action: :index }, success: "#{@upload.name} created")
    else
      render :index, warning: @upload.errors.full_messages.join(", ")
    end
  end

  def update
    @upload = Upload.find(params[:id])
    if @upload.update(upload_params)
      redirect_to({ action: :index }, success: "#{@upload.name} updated")
    else
      render :index, warning: @upload.errors.full_messages.join(", ")
    end
  end

  def destroy
    @upload = Upload.find(params[:id])
    @upload.destroy
    redirect_to({ action: :index }, danger: "#{@upload.name} deleted")
  end

  private
  def upload_params
    params.require(:upload).permit(:name, :file)
  end
end
