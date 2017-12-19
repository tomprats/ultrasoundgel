class Admin::ArticleCategoriesController < AdminController
  def index
    @category = ArticleCategory.new
    @categories = ArticleCategory.all
  end

  def edit
    @category = ArticleCategory.find(params[:id])
    @categories = ArticleCategory.all
    render :index
  end

  def create
    @category = ArticleCategory.new(category_params)
    if @category.save
      redirect_to({ action: :index }, success: "#{@category.name} created")
    else
      @categories = ArticleCategory.all
      render :index, warning: @category.errors.full_messages.join(", ")
    end
  end

  def update
    @category = ArticleCategory.find(params[:id])
    if @category.update(category_params)
      redirect_to({ action: :index }, success: "#{@category.name} updated")
    else
      @categories = ArticleCategory.all
      render :index, warning: @category.errors.full_messages.join(", ")
    end
  end

  def destroy
    @category = ArticleCategory.find(params[:id])
    @category.destroy
    redirect_to({ action: :index }, danger: "#{@category.name} deleted")
  end

  private
  def category_params
    params.require(:article_category).permit(:rank, :name)
  end
end
