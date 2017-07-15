class Admin::EpisodesController < AdminController
  def index
    @episode = Episode.new
  end

  def edit
    @episode = Episode.find_by(uid: params[:uid])
    render :index
  end

  def create
    @episode = Episode.new(episode_params)
    if @episode.save
      redirect_to({ action: :index }, success: "#{@episode.title} created")
    else
      render :index, warning: @episode.errors.full_messages.join(", ")
    end
  end

  def update
    @episode = Episode.find_by(uid: params[:uid])
    if @episode.update(episode_params)
      redirect_to({ action: :index }, success: "#{@episode.title} updated")
    else
      render :index, warning: @episode.errors.full_messages.join(", ")
    end
  end

  def publish
    @episode = Episode.find_by(uid: params[:uid])
    published_at = params[:published_at].blank? ? DateTime.now : DateTime.strptime(params[:published_at], "%m/%d/%Y %I:%M %P")
    if @episode.update(published_at: published_at)
      redirect_to({ action: :index }, success: "#{@episode.title} published")
    else
      render :index, warning: @episode.errors.full_messages.join(", ")
    end
  end

  def destroy
    @episode = Episode.find_by(uid: params[:uid])
    @episode.destroy
    redirect_to({ action: :index }, danger: "#{@episode.title} deleted")
  end

  private
  def episode_params
    params.require(:episode).permit(
      :channel_id, :audio_id, :image_id, :uid,
      :title, :subtitle, :author, :summary,
      :explicit, :google_link, :itunes_link
    )
  end
end
