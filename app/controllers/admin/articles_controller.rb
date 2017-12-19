class Admin::ArticlesController < AdminController
  def index
    @article = Article.new
    @articles = Article.all
  end

  def edit
    @article = Article.find(params[:id])
    @articles = Article.all
    render :index
  end

  def create
    @article = Article.new(article_params)
    if @article.save
      redirect_to({ action: :index }, success: "#{@article.title} created")
    else
      @articles = Article.all
      render :index, warning: @article.errors.full_messages.join(", ")
    end
  end

  def update
    @article = Article.find(params[:id])
    if @article.update(article_params)
      redirect_to({ action: :index }, success: "#{@article.title} updated")
    else
      @articles = Article.all
      render :index, warning: @article.errors.full_messages.join(", ")
    end
  end

  def destroy
    @article = Article.find(params[:id])
    @article.destroy
    redirect_to({ action: :index }, danger: "#{@article.title} deleted")
  end

  private
  def article_params
    params.require(:article).permit(
      :category_id, :link, :title,
      :journal, :year, :month
    )
  end
end
