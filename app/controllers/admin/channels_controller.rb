class Admin::ChannelsController < AdminController
  def index
    @channel = Channel.new
  end

  def edit
    @channel = Channel.find(params[:id])

    render :index
  end

  def create
    @channel = Channel.new(channel_params)
    if @channel.save
      redirect_to({ action: :index }, success: "#{@channel.title} created")
    else
      render :index, warning: @channel.errors.full_messages.join(", ")
    end
  end

  def update
    @channel = Channel.find(params[:id])
    if @channel.update(channel_params)
      redirect_to({ action: :index }, success: "#{@channel.title} updated")
    else
      render :index, warning: @channel.errors.full_messages.join(", ")
    end
  end

  def destroy
    @channel = Channel.find(params[:id])
    @channel.destroy
    redirect_to({ action: :index }, danger: "#{@channel.title} deleted")
  end

  private
  def channel_params
    params.require(:channel).permit(
      :image_id, :title, :subtitle, :author, :link,
      :owner_name, :owner_email, :summary, :categories,
      :explicit
    )
  end
end
