class Api::Admin::PostsController < Api::Admin::ApplicationController
  def index
    posts = Post.all

    render json: {posts: posts_as_json(posts)}
  end

  def create
    post = Post.new(post_params)

    if post.save
      render json: {message: "#{post.title} created", success: true}
    else
      render json: {message: post.errors.full_messages.join(", "), success: false}
    end
  end

  def show
    post = Post.find_by(uid: params[:uid])

    render json: {post: post_as_json(post)}
  end

  def update
    post = Post.find_by(uid: params[:uid])

    if post.update(post_params)
      render json: {message: "#{post.title} updated", success: true}
    else
      render json: {message: post.errors.full_messages.join(", "), success: false}
    end
  end

  def destroy
    post = Post.find_by(uid: params[:uid])

    if post.destroy
      render json: {message: "#{post.title} deleted", success: true}
    else
      render json: {message: "There was an issue", success: false}
    end
  end

  def publish
    post = Post.find_by(uid: params[:uid])
    published_at = params[:published_at]
    published_at = published_at.blank? ? Time.zone.now : Time.zone.parse(published_at)

    if post.update(published_at: published_at)
      render json: {
        post: post_as_json_for_index(post),
        message: "#{post.title} published",
        success: true
      }
    else
      render json: {message: post.errors.full_messages.join(", "), success: false}
    end
  end

  def unpublish
    post = Post.find_by(uid: params[:uid])

    if post.update(published_at: nil)
      render json: {
        post: post_as_json_for_index(post),
        message: "#{post.title} unpublished",
        success: true
      }
    else
      render json: {message: post.errors.full_messages.join(", "), success: false}
    end
  end

  private

  def post_as_json(post)
    post.as_json(only: [
      :episode_id,
      :id,
      :public_tags,
      :tags,
      :title,
      :uid
    ]).merge(content: post.content_edit_value)
  end

  def post_as_json_for_index(post)
    post.as_json(
      include: {episode: {only: [:id, :title, :uid]}},
      only: [
        :created_at,
        :episode_id,
        :id,
        :public_tags,
        :published_at,
        :title,
        :uid
      ]
    )
  end

  def post_params
    params.require(:post).permit(
      :content,
      :episode_id,
      :tags,
      :title,
      public_tags: []
    )
  end

  def posts_as_json(posts)
    posts.map{ |post| post_as_json_for_index(post) }
  end
end
