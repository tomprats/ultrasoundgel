class EpisodesController < ApplicationController
  before_action :set_episode

  def audio
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
