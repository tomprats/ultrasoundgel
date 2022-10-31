class Api::Preview::EpisodesController < Api::Preview::ApplicationController
  include EpisodeConcerns

  def index
    episodes = Episode.full.descending.with_attached_image

    render json: paginated_episodes(episodes)
  end

  def show
    episode = Episode.find_by!(uid: params[:uid])

    render json: {episode: episode_as_json(episode)}
  end
end
