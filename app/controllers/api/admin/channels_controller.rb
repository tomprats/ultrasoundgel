class Api::Admin::ChannelsController < Api::Admin::ApplicationController
  def index
    channels = Channel.all

    render json: {channels: channels_as_json(channels)}
  end

  def create
    channel = Channel.new(channel_params)

    if channel.save
      render json: {message: "#{channel.title} created", success: true}
    else
      render json: {message: channel.errors.full_messages.join(", "), success: false}
    end
  end

  def show
    channel = Channel.find_by(uid: params[:uid])

    render json: {channel: channel_as_json(channel)}
  end

  def update
    channel = Channel.find_by(uid: params[:uid])

    if channel.update(channel_params)
      render json: {message: "#{channel.title} updated", success: true}
    else
      render json: {message: channel.errors.full_messages.join(", "), success: false}
    end
  end

  def destroy
    channel = Channel.find_by(uid: params[:uid])

    if channel.destroy
      render json: {message: "#{channel.title} deleted", success: true}
    else
      render json: {message: "There was an issue", success: false}
    end
  end

  def publish
    channel = Channel.find_by(uid: params[:uid])
    published_at = params[:published_at]
    published_at = published_at.blank? ? Time.zone.now : Time.zone.parse(published_at)

    if channel.update(published_at: published_at)
      render json: {
        channel: channel_as_json_for_index(channel),
        message: "#{channel.title} published",
        success: true
      }
    else
      render json: {message: channel.errors.full_messages.join(", "), success: false}
    end
  end

  def unpublish
    channel = Channel.find_by(uid: params[:uid])

    if channel.update(published_at: nil)
      render json: {
        channel: channel_as_json_for_index(channel),
        message: "#{channel.title} unpublished",
        success: true
      }
    else
      render json: {message: channel.errors.full_messages.join(", "), success: false}
    end
  end

  private

  def channel_as_json(channel)
    channel.as_json(only: [
      :author,
      :categories,
      :explicit,
      :google_link,
      :id,
      :itunes_link,
      :link,
      :owner_name,
      :owner_email,
      :redirect,
      :subtitle,
      :title,
      :uid
    ]).merge(
      description: channel.description_edit_value,
      image: channel.current_image
    )
  end

  def channel_as_json_for_index(channel)
    channel.as_json(only: [
      :author,
      :created_at,
      :id,
      :owner_name,
      :owner_email,
      :published_at,
      :redirect,
      :title,
      :uid
    ]).merge(image: channel.current_image)
  end

  def channel_params
    params.require(:channel).permit(
      :author,
      :categories,
      :description,
      :explicit,
      :google_link,
      :image,
      :itunes_link,
      :link,
      :owner_name,
      :owner_email,
      :redirect,
      :subtitle,
      :title
    )
  end

  def channels_as_json(channels)
    channels.map{ |channel| channel_as_json_for_index(channel) }
  end
end
