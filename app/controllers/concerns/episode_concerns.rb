module EpisodeConcerns
  extend ActiveSupport::Concern

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

  def paginated_episodes(episodes)
    episodes = episodes.search(params[:search]) if params[:search]
    total = episodes.length
    limit = (params[:limit] || 3).to_i
    page = (params[:page] || 1).to_i
    pages = (total / limit.to_f).ceil
    pages = 1 if pages < 1
    episodes = episodes.offset((page - 1) * limit).limit(limit)

    {
      episodes: episodes_as_json(episodes),
      limit: limit,
      page: page,
      pages: pages,
      total: total
    }
  end

  private

  def episode_fields
    [
      :author,
      :google_link,
      :itunes_link,
      :kind,
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
end
