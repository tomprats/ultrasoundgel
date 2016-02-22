class PostsController < ApplicationController
  before_action :set_post

  private
  def set_post
    @post = Post.find_by(uid: params[:uid])
  end
end
