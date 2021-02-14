class Api::ArticlesController < Api::ApplicationController
  def index
    render json: {articles: articles_as_json, categories: categories_as_json}
  end

  private

  def articles_as_json
    Rails.cache.fetch("articles", expires_in: 5.minutes) do
      Article.all.as_json(only: [
        :category_id,
        :id,
        :journal,
        :link,
        :month,
        :title,
        :year
      ])
    end
  end

  def categories_as_json
    Rails.cache.fetch("article-categories", expires_in: 5.minutes) do
      ArticleCategory.all.as_json(only: [:id, :name, :rank])
    end
  end
end
