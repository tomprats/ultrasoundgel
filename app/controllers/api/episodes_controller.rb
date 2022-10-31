class Api::EpisodesController < Api::ApplicationController
  include EpisodeConcerns

  before_action :verify_published, only: :index

  def index
    return all if params[:limit] == "none"

    episodes = Episode.published.full.descending.with_attached_image

    render json: paginated_episodes(episodes)
  end

  def show
    episode = Episode.find_by!(uid: params[:uid])

    render json: {episode: episode_as_json(episode)}
  end

  private

  def all
    render json: {
      episodes: Episode.published.full.ascending.map do |episode|
        post = episode.post&.published? && episode.post.as_json(only: [:published_at, :title])

        episode.as_json(
          only: [
            :author,
            :google_link,
            :itunes_link,
            :number,
            :published_at,
            :subtitle,
            :title,
            :uid,
            :updated_at
          ]
        ).merge(post: post)
      end
    }
  end

  def verify_published
    Episode.published.full.ascending.where(number: nil).each do |episode|
      episode.update(number: (Episode.maximum(:number) || 0) + 1)
    end
  end
end
