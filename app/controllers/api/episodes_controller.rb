class Api::EpisodesController < Api::ApplicationController
  before_action :verify_published, only: :index

  def index
    return all if params[:limit] == "none"

    episodes = Episode.published.descending.with_attached_image
    episodes = episodes.search(params[:search]) if params[:search]
    total = episodes.length
    limit = (params[:limit] || 3).to_i
    page = (params[:page] || 1).to_i
    pages = (total / limit.to_f).ceil
    pages = 1 if pages < 1
    episodes = episodes.offset((page - 1) * limit).limit(limit)

    render json: {
      episodes: episodes_as_json(episodes),
      limit: limit,
      page: page,
      pages: pages,
      total: total
    }
  end

  def show
    episode = Episode.find_by!(uid: params[:uid])

    render json: {episode: episode_as_json(episode)}
  end

  private

  def all
    render json: {
      episodes: Episode.published.ascending.map do |episode|
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

  def episode_as_json(episode)
    episode.as_json(
      methods: [:audio_duration, :audio_extension, :audio_type, :image_extension],
      only: episode_fields
    ).merge(
      audio: episode.current_audio,
      description: episode.current_description_html,
      image: episode.current_image,
      post: post_as_json(episode.post)
    )
  end

  def episodes_as_json(episodes)
    episodes.map do |episode|
      episode.as_json(
        methods: [:audio_duration, :audio_extension, :audio_type, :image_extension],
        only: episode_fields
      ).merge(
        audio: episode.current_audio,
        description: episode.current_description_html,
        image: episode.current_image,
        post: post_as_json(episode.post)
      )
    end
  end

  def episode_fields
    [
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
  end

  def post_as_json(post)
    return unless post&.published?

    post.as_json(only: [:published_at, :uid])
  end

  def verify_published
    Episode.published.ascending.where(number: nil).each do |episode|
      episode.update(number: (Episode.maximum(:number) || 0) + 1)
    end
  end
end
