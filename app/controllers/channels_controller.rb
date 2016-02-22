class ChannelsController < ApplicationController
  before_action :set_channel

  def image
    redirect_to @channel.image.file.url
  end

  private
  def set_channel
    @channel = Channel.find_by(uid: params[:uid])
  end
end
