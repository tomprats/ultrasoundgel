class EpisodesController < ApplicationController
  before_action :set_episode

  def audio
    EpisodeAudioStatsJob.perform_later(
      @episode.id,
      accept_language: request.accept_language,
      ip_address: request.remote_ip,
      range: request.headers["HTTP_RANGE"],
      referer: request.referer,
      user_agent: request.user_agent
    )

    redirect_to @episode.current_audio(disposition: :inline, proxy: true)
  end

  def image
    redirect_to @episode.current_image(proxy: true)
  end

  private

  def set_episode
    @episode = Episode.find_by!(uid: params[:uid])
  end
end
