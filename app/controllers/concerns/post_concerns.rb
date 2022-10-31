module PostConcerns
  extend ActiveSupport::Concern

  def post_as_json(record)
    record.as_json(only: [:id, :public_tags, :published_at, :title, :uid]).merge(
      content: record.current_content,
      comments: comments_as_json(record.comments),
      episode: episode_as_json(record.episode)
    )
  end

  def posts_as_json(records)
    records.map do |record|
      record.as_json(
        only: [:id, :public_tags, :published_at, :title, :uid]
      ).merge(
        content: record.current_content
      )
    end
  end

  private

  def episode_as_json(record)
    record.as_json(
      methods: [:audio_duration, :audio_extension, :audio_type, :image_extension],
      only: [
        :author,
        :google_link,
        :itunes_link,
        :kind,
        :number,
        :published_at,
        :title,
        :uid,
        :updated_at
      ]
    )
  end
end
