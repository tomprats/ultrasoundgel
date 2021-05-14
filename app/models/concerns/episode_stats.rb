module EpisodeStats
  extend ActiveSupport::Concern

  included do
    def downloads
      audio_stats.downloads
    end

    def recent_downloads
      audio_stats.recent.downloads
    end

    def recent_unique_downloads
      audio_stats.recent.unique_downloads
    end

    def unique_downloads
      audio_stats.unique_downloads
    end
  end
end
