class EpisodesController < ApplicationController
  before_action :set_episode

  def audio
    redirect_to @episode.audio.file.url
  end

  def image
    redirect_to @episode.image.file.large.url
  end

  private
  def set_episode
    @episode = Episode.find_by!(uid: params[:uid])
  end
end
