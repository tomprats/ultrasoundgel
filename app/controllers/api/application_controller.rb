class Api::ApplicationController < ApplicationController
  def environment
    render json: {
      channel: channel_as_json,
      pages: pages_as_json,
      sections: sections_as_json,
      user: user_as_json(current_user)
    }
  end

  private

  def channel_as_json
    Rails.cache.fetch("app-channel", expires_in: 5.minutes) do
      channel = Channel.published.last
      channel.as_json(only: [:google_link, :itunes_link]).merge(
        description: channel.current_description,
        episodeNumber: Episode.maximum(:number),
        image: channel.current_image
      )
    end
  end

  def pages_as_json
    if current_user&.admin
      Rails.cache.fetch("app-pages-admin", expires_in: 5.minutes) do
        pages_as_json_from(Page.all)
      end
    else
      Rails.cache.fetch("app-pages", expires_in: 5.minutes) do
        pages_as_json_from(Page.active)
      end
    end
  end

  def pages_as_json_from(pages)
    pages.map do |page|
      page.as_json(only: [:active, :name, :path, :template]).merge(
        content: page.current_content
      )
    end
  end

  def sections_as_json
    Rails.cache.fetch("app-sections", expires_in: 5.minutes) do
      Section.all.as_json(
        include: {contents: {methods: [:value], only: [:kind, :name]}},
        only: [:name]
      )
    end
  end

  def user_as_json(user)
    return if user.blank?

    user.as_json(
      only: [
        :admin,
        :email,
        :first_name,
        :id,
        :last_name,
        :post_notifications
      ]
    ).merge({image: user.current_image})
  end
end
