class Api::Admin::StatsController < Api::Admin::ApplicationController
  def index
    episodes = Episode.all

    render json: {
      channel: {
        average_downloads: round(EpisodeAudioStat.downloads / total_months.to_f),
        average_recent_downloads: round(EpisodeAudioStat.recent(6.months).downloads / 6.0),
        average_recent_unique_downloads: round(EpisodeAudioStat.recent(6.months).unique_downloads / 6.0),
        average_unique_downloads: round(EpisodeAudioStat.unique_downloads / total_months.to_f),
        downloads: EpisodeAudioStat.downloads,
        monthly_downloads: EpisodeAudioStat.monthly_downloads,
        recent_downloads: EpisodeAudioStat.recent.downloads,
        recent_unique_downloads: EpisodeAudioStat.recent.unique_downloads,
        unique_downloads: EpisodeAudioStat.unique_downloads
      },
      episodes: episodes_as_json(episodes)
    }
  end

  private

  def episode_as_json_for_index(episode)
    episode.as_json(
      only: [
        :id,
        :published_at,
        :title,
        :uid
      ],
      methods: [
        :downloads,
        :recent_downloads,
        :recent_unique_downloads,
        :unique_downloads
      ]
    )
  end

  def episodes_as_json(episodes)
    episodes.map{ |episode| episode_as_json_for_index(episode) }
  end

  def round(float)
    float.round(2)
  end

  def total_months
    @total_months ||= begin
      first_record = EpisodeAudioStat.order(:created_at).first

      (DateTime.current.to_i - first_record.created_at.to_i).seconds.in_months.ceil
    end
  end
end
