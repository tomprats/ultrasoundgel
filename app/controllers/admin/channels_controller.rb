class Admin::ChannelsController < AdminController
  def index
    @channel = Channel.new
  end

  def edit
    @channel = Channel.find_by(uid: params[:uid])
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
    @channel = Channel.find_by(uid: params[:uid])
    if @channel.update(channel_params)
      redirect_to({ action: :index }, success: "#{@channel.title} updated")
    else
      render :index, warning: @channel.errors.full_messages.join(", ")
    end
  end

  def publish
    @channel = Channel.find_by(uid: params[:uid])
    published_at = params[:published_at].blank? ? Time.zone.now : Time.zone.parse(params[:published_at])
    if @channel.update(published_at: published_at)
      redirect_to({ action: :index }, success: "#{@channel.title} published")
    else
      render :index, warning: @channel.errors.full_messages.join(", ")
    end
  end

  def destroy
    @channel = Channel.find_by(uid: params[:uid])
    if @channel.destroy
      redirect_to({ action: :index }, danger: "#{@channel.title} deleted")
    else
      redirect_to({ action: :index }, warning: @channel.errors.full_messages.join(", "))
    end
  end

  private
  def channel_params
    params.require(:channel).permit(
      :image_id, :title, :subtitle, :author, :link,
      :owner_name, :owner_email, :summary, :categories,
      :explicit, :google_link, :itunes_link
    )
  end
end
