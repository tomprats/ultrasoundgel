class PagesController < ApplicationController
  before_action :check_path, only: :show

  def show
    @page ||= Page.find_by(path: params[:path]) || not_found
    @html = @page.text_to_html

    case @page.template
    when "home"
      @episodes = @episodes.search(@search) if @search = params[:search].presence
    when "articles"
      @new_articles = Article.where("make_date(year, month, 1) > now() - '2 months'::interval")
      @old_articles = Article.where("make_date(year, month, 1) < now() - '1 year'::interval")
      @categories = ArticleCategory.all.includes(:articles)
    end

    render "templates/#{@page.template}", layout: true
  end

  def home
    @page = Page.home
    @episodes = Episode.published

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
