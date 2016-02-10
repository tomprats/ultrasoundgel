class PagesController < ApplicationController
  def show
    @page = Page.find_by(path: params[:path]) || not_found

    @html = Rails.cache.fetch(@page) do
      markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML, autolink: true, tables: true)
      markdown.render(@page.text || "").html_safe
    end

    if ["contact"].include? @page.path
      render @page.path, layout: true
    end
  end

  def home
    @posts = Post.published
  end
end
