class Api::Admin::CasesController < Api::Admin::ApplicationController
  def index
    records = Case.all

    render json: {cases: records_as_json(records)}
  end

  def create
    record = Case.new(record_params)

    if record.save
      render json: {message: "#{record.title} created", success: true}
    else
      render json: {message: record.errors.full_messages.join(", "), success: false}
    end
  end

  def show
    record = Case.find_by(uid: params[:uid])

    render json: {case: record_as_json(record)}
  end

  def update
    record = record.find_by(uid: params[:uid])

    if record.update(record_params)
      render json: {message: "#{record.title} updated", success: true}
    else
      render json: {message: record.errors.full_messages.join(", "), success: false}
    end
  end

  def destroy
    record = Case.find_by(uid: params[:uid])

    if record.destroy
      render json: {message: "#{record.title} deleted", success: true}
    else
      render json: {message: "There was an issue", success: false}
    end
  end

  def publish
    record = Case.find_by(uid: params[:uid])
    published_at = params[:published_at]
    published_at = published_at.blank? ? Time.zone.now : Time.zone.parse(published_at)

    if record.update(published_at: published_at)
      render json: {
        case: record_as_json_for_index(record),
        message: "#{record.title} published",
        success: true
      }
    else
      render json: {message: record.errors.full_messages.join(", "), success: false}
    end
  end

  def unpublish
    record = Case.find_by(uid: params[:uid])

    if record.update(published_at: nil)
      render json: {
        case: record_as_json_for_index(record),
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
      :id,
      :public_tags,
      :tags,
      :title,
      :uid
    ]).merge(content: record.content_edit_value)
  end

  def record_as_json_for_index(record)
    record.as_json(
      only: [
        :created_at,
        :id,
        :public_tags,
        :published_at,
        :title,
        :uid
      ]
    )
  end

  def record_params
    params.require(:case).permit(
      :content,
      :tags,
      :title,
      public_tags: []
    )
  end

  def records_as_json(records)
    records.map{ |record| record_as_json_for_index(record) }
  end
end
