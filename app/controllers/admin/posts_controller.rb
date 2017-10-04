class Admin::PostsController < AdminController
  def index
    @post = Post.new
  end

  def edit
    @post = Post.find_by(uid: params[:uid])
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
    @post = Post.find_by(uid: params[:uid])
    if @post.update(post_params)
      redirect_to({ action: :index }, success: "#{@post.title} updated")
    else
      render :index, warning: @post.errors.full_messages.join(", ")
    end
  end

  def publish
    @post = Post.find_by(uid: params[:uid])
    published_at = params[:published_at].blank? ? DateTime.now : DateTime.strptime(params[:published_at], "%m/%d/%Y %I:%M %P")
    if @post.update(published_at: published_at)
      redirect_to({ action: :index }, success: "#{@post.title} published")
    else
      render :index, warning: @post.errors.full_messages.join(", ")
    end
  end

  def destroy
    @post = Post.find_by(uid: params[:uid])
    if @post.destroy
      redirect_to({ action: :index }, danger: "#{@post.title} deleted")
    else
      redirect_to({ action: :index }, warning: @post.errors.full_messages.join(", "))
    end
  end

  private
  def post_params
    params.require(:post).permit(
      :episode_id, :title, :text, :tags
    )
  end
end
