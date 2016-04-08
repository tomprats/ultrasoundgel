class PagesController < ApplicationController
  def show
    @page ||= Page.find_by(path: params[:path]) || not_found
    @html = @page.text_to_html

    if ["home", "contact"].include? @page.path
      render @page.path, layout: true
    end
  end

  def home
    @page = Page.home
    @episodes = Episode.published

    show
  end
end
