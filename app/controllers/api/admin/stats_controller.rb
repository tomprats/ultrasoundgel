class Api::Admin::StatsController < Api::Admin::ApplicationController
  def index
    episodes = Episode.all

    render json: {
      channel: {
        downloads: downloads_over_time,
        monthly_downloads: EpisodeAudioStat.monthly_downloads
      },
      episodes: episodes_as_json(episodes)
    }
  end

  private

  def downloads_over_time
    ytd = (DateTime.current.to_i - DateTime.current.beginning_of_year.to_i).seconds.in_months.ceil
    downloads = [
      ["YTD", ytd, ytd.month],
      ["1 month", 1, 1.month],
      ["6 months", 6, 6.months],
      ["1 year", 12, 12.months]
    ].map do |(name, months, since)|
      total_downloads = EpisodeAudioStat.recent(since).downloads
      unique_downloads = EpisodeAudioStat.recent(since).unique_downloads

      {
        average_downloads: round(total_downloads / months.to_f),
        average_unique_downloads: round(unique_downloads / months.to_f),
        name: name,
        total_downloads: total_downloads,
        unique_downloads: unique_downloads
      }
    end

    total_downloads = EpisodeAudioStat.downloads
    unique_downloads = EpisodeAudioStat.unique_downloads
    downloads.prepend({
      average_downloads: round(total_downloads / total_months.to_f),
      average_unique_downloads: round(unique_downloads / total_months.to_f),
      name: "Overall",
      total_downloads: total_downloads,
      unique_downloads: unique_downloads
    })

    downloads
  end

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
