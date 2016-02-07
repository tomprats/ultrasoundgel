class Admin::PostsController < AdminController
  def index
    @post = Post.new
  end

  def edit
    @post = Post.find(params[:id])

    render :index
  end

  def create
    @post = Post.new(post_params)
    if @post.save
      redirect_to({ action: :index }, success: "#{@post.title} created")
    else
      render :index, warning: @post.errors.full_messages.join(", ")
    end
  end

  def update
    @post = Post.find(params[:id])
    if @post.update(post_params)
      redirect_to({ action: :index }, success: "#{@post.title} updated")
    else
      render :index, warning: @post.errors.full_messages.join(", ")
    end
  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy
    redirect_to({ action: :index }, danger: "#{@post.title} deleted")
  end

  private
  def post_params
    params.require(:post).permit(
      :episode_id, :title, :text, :tags
    )
  end
end
