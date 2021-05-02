class Api::PostsController < Api::ApplicationController
  before_action :set_post

  def show
    render json: {post: post_as_json(@post)}
  end

  def subscribe
    render json: {success: false, message: "No one's home"} if current_user.blank?

    current_user.comment_notifications.find_or_create_by(post_id: @post.id)

    render json: {success: true, message: "Subscribed"}
  end

  def unsubscribe
    render json: {success: false, message: "No one's home"} if current_user.blank?

    current_user.comment_notifications.find_by(post_id: @post.id).try(:destroy)

    render json: {success: true, message: "Unsubscribed"}
  end

  private

  def episode_as_json(episode)
    episode.as_json(
      methods: [:audio_duration, :audio_extension, :audio_type, :image_extension],
      only: [
        :author,
        :google_link,
        :itunes_link,
        :number,
        :published_at,
        :title,
        :uid,
        :updated_at
      ]
    )
  end

  def post_as_json(post)
    post.as_json(only: [:id, :public_tags, :published_at, :title]).merge(
      content: post.current_content,
      comments: comments_as_json(post.comments),
      episode: episode_as_json(post.episode)
    )
  end

  def set_post
    @post = Post.find_by!(uid: params[:uid])
  end
end
