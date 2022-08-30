class Api::Admin::PostsController < Api::Admin::ApplicationController
  def index
    records = Post.all

    render json: {posts: records_as_json(records)}
  end

  def create
    record = Post.new(record_params)

    if record.save
      render json: {message: "#{record.title} created", success: true}
    else
      render json: {message: record.errors.full_messages.join(", "), success: false}
    end
  end

  def show
    record = Post.find_by(uid: params[:uid])

    render json: {post: record_as_json(record)}
  end

  def update
    record = Post.find_by(uid: params[:uid])

    if record.update(record_params)
      render json: {message: "#{record.title} updated", success: true}
    else
      render json: {message: record.errors.full_messages.join(", "), success: false}
    end
  end

  def destroy
    record = Post.find_by(uid: params[:uid])

    if record.destroy
      render json: {message: "#{record.title} deleted", success: true}
    else
      render json: {message: "There was an issue", success: false}
    end
  end

  def publish
    record = Post.find_by(uid: params[:uid])
    published_at = params[:published_at]
    published_at = published_at.blank? ? Time.zone.now : Time.zone.parse(published_at)

    if record.update(published_at: published_at)
      render json: {
        post: record_as_json_for_index(record),
        message: "#{record.title} published",
        success: true
      }
    else
      render json: {message: record.errors.full_messages.join(", "), success: false}
    end
  end

  def unpublish
    record = Post.find_by(uid: params[:uid])

    if record.update(published_at: nil)
      render json: {
        post: record_as_json_for_index(record),
        message: "#{record.title} unpublished",
        success: true
      }
    else
      render json: {message: record.errors.full_messages.join(", "), success: false}
    end
  end

  private

  def record_as_json(record)
    record.as_json(only: [
      :episode_id,
      :id,
      :public_tags,
      :tags,
      :title,
      :uid
    ]).merge(content: record.content_edit_value)
  end

  def record_as_json_for_index(record)
    record.as_json(
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

  def record_params
    params.require(:post).permit(
      :content,
      :episode_id,
      :tags,
      :title,
      public_tags: []
    )
  end

  def records_as_json(records)
    records.map{ |record| record_as_json_for_index(record) }
  end
end
