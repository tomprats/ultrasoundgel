class PagesController < ApplicationController
  before_action :check_path, only: :show

  def show
    render html: "", layout: true
  end

  def home
    @page = Page.home

    show
  end

  private

  def check_path
    number = params[:path].to_i
    return unless number > 0

    episode = Episode.ascending.published.find_by(number: number)
    episode ||= Episode.ascending.published.offset(number - 1).first
    return unless episode

    redirect_to episode.post || episode
  end
end
