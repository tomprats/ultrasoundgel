class Api::Admin::UploadsController < Api::Admin::ApplicationController
  def index
    uploads = Upload.order(created_at: :desc).all

    render json: {uploads: uploads_as_json(uploads)}
  end

  private

  def uploads_as_json(uploads)
    uploads.map do |upload|
      upload.as_json(only: [
        :content_type,
        :created_at,
        :name,
        :id,
        :file
      ]).merge(file: upload.file.url)
    end
  end
end
