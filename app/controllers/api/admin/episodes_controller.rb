class Api::Admin::EpisodesController < Api::Admin::ApplicationController
  def index
    episodes = Episode.all

    render json: {episodes: episodes_as_json(episodes)}
  end

  def create
    episode = Episode.new(episode_params)

    if episode.save
      render json: {message: "#{episode.title} created", success: true}
    else
      render json: {message: episode.errors.full_messages.join(", "), success: false}
    end
  end

  def show
    episode = Episode.find_by(uid: params[:uid])

    render json: {episode: episode_as_json(episode)}
  end

  def update
    episode = Episode.find_by(uid: params[:uid])

    if episode.update(episode_params)
      render json: {message: "#{episode.title} updated", success: true}
    else
      render json: {message: episode.errors.full_messages.join(", "), success: false}
    end
  end

  def destroy
    episode = Episode.find_by(uid: params[:uid])

    if episode.destroy
      render json: {message: "#{episode.title} deleted", success: true}
    else
      render json: {message: "There was an issue", success: false}
    end
  end

  def publish
    episode = Episode.find_by(uid: params[:uid])
    published_at = params[:published_at]
    published_at = published_at.blank? ? Time.zone.now : Time.zone.parse(published_at)

    if episode.update(published_at: published_at)
      render json: {
        episode: episode_as_json_for_index(episode),
        message: "#{episode.title} published",
        success: true
      }
    else
      render json: {message: episode.errors.full_messages.join(", "), success: false}
    end
  end

  def unpublish
    episode = Episode.find_by(uid: params[:uid])

    if episode.update(published_at: nil)
      render json: {
        episode: episode_as_json_for_index(episode),
        message: "#{episode.title} unpublished",
        success: true
      }
    else
      render json: {message: episode.errors.full_messages.join(", "), success: false}
    end
  end

  private

  def episode_as_json(episode)
    episode.as_json(only: [
      :author,
      :explicit,
      :google_link,
      :id,
      :itunes_link,
      :subtitle,
      :title,
      :uid
    ]).merge(
      audio: episode.current_audio,
      description: episode.description_edit_value,
      image: episode.current_image
    )
  end

  def episode_as_json_for_index(episode)
    episode.as_json(
      include: {channel: {only: [:id, :title, :uid]}},
      only: [
        :author,
        :channel_id,
        :created_at,
        :id,
        :published_at,
        :title,
        :uid
      ]
    ).merge(
      audio: episode.current_audio,
      image: episode.current_image
    )
  end

  def episode_params
    params.require(:episode).permit(
      :audio,
      :author,
      :channel_id,
      :description,
      :explicit,
      :google_link,
      :image,
      :itunes_link,
      :subtitle,
      :title
    )
  end

  def episodes_as_json(episodes)
    episodes.map{ |episode| episode_as_json_for_index(episode) }
  end
end
