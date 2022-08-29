class Api::Preview::PostsController < Api::Preview::ApplicationController
  include PostConcerns

  def index
    records = Post.descending

    render json: {posts: posts_as_json(records)}
  end

  def show
    record = Post.find_by!(uid: params[:uid])

    render json: {post: post_as_json(record)}
  end
end
