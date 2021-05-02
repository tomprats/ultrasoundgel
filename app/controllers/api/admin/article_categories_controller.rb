class Api::Admin::ArticleCategoriesController < Api::Admin::ApplicationController
  def index
    categories = ArticleCategory.order(:name).all

    render json: {categories: categories_as_json(categories)}
  end

  def create
    category = ArticleCategory.new(category_params)

    if category.save
      render json: {message: "#{category.name} created", success: true}
    else
      render json: {message: category.errors.full_messages.join(", "), success: false}
    end
  end

  def show
    category = ArticleCategory.find(params[:id])

    render json: {category: category_as_json(category)}
  end

  def update
    category = ArticleCategory.find(params[:id])

    if category.update(category_params)
      render json: {message: "#{category.name} updated", success: true}
    else
      render json: {message: category.errors.full_messages.join(", "), success: false}
    end
  end

  def destroy
    category = ArticleCategory.find(params[:id])

    if category.destroy
      render json: {message: "#{category.name} deleted", success: true}
    else
      render json: {message: "There was an issue", success: false}
    end
  end

  private

  def category_params
    params.require(:category).permit(
      :name,
      :rank
    )
  end

  def category_as_json(category)
    category.as_json(only: [
      :id,
      :name,
      :rank
    ])
  end

  def categories_as_json(categories)
    categories.as_json(only: [
      :created_at,
      :id,
      :name,
      :rank
    ])
  end
end
