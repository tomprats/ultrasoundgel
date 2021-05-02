class Api::Admin::ArticlesController < Api::Admin::ApplicationController
  def index
    articles = Article.order(year: :desc, month: :desc).all

    render json: {articles: articles_as_json(articles)}
  end

  def create
    article = Article.new(article_params)

    if article.save
      render json: {message: "#{article.title} created", success: true}
    else
      render json: {message: article.errors.full_messages.join(", "), success: false}
    end
  end

  def show
    article = Article.find(params[:id])

    render json: {article: article_as_json(article)}
  end

  def update
    article = Article.find(params[:id])

    if article.update(article_params)
      render json: {message: "#{article.title} updated", success: true}
    else
      render json: {message: article.errors.full_messages.join(", "), success: false}
    end
  end

  def destroy
    article = Article.find(params[:id])

    if article.destroy
      render json: {message: "#{article.title} deleted", success: true}
    else
      render json: {message: "There was an issue", success: false}
    end
  end

  private

  def article_params
    params.require(:article).permit(
      :category_id,
      :journal,
      :link,
      :month,
      :title,
      :year
    )
  end

  def article_as_json(article)
    article.as_json(only: [
      :category_id,
      :id,
      :journal,
      :link,
      :month,
      :title,
      :year
    ])
  end

  def articles_as_json(articles)
    articles.as_json(
      include: {category: {only: [:id, :name]}},
      only: [
        :category_id,
        :created_at,
        :id,
        :journal,
        :link,
        :month,
        :title,
        :year
      ]
    )
  end
end
