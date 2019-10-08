class ChannelsController < ApplicationController
  before_action :set_channel, except: :index

  def image
    redirect_to @channel.image.file.large.url
  end

  def index
    @channel = Channel.published.last || Channel.new

    render formats: :rss, layout: false
  end

  private

  def set_channel
    @channel = Channel.find_by!(uid: params[:uid])
  end
end
