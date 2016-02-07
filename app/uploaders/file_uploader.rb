require "taglib"
class FileUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  storage :fog

  process :set_model

  def store_dir
    "upload/#{model.id}"
  end

  def filename
    "original.#{file.extension}" if original_filename
  end

  version :large, if: :image? do
    process resize_to_fill: [1400, 1400]

    def full_filename(for_file = model.file.file)
      "large.#{for_file.split(".").last}"
    end
  end

  def set_model
    model.type = "AudioUpload" if model.file.content_type.include? "audio"
    model.type ||= "ImageUpload" if model.file.content_type.include? "image"
    model.type ||= "FileUpload"

    model.size = model.file.size
    model.content_type = model.file.content_type

    TagLib::FileRef.open(model.file.path) { |ref| model.duration = ref.audio_properties.length } if audio?
    # AudioInfo.open(model.file.path) { |info| model.duration = info.length } if audio?
  end

  def audio?(*args)
    model.type == "AudioUpload"
  end

  def image?(*args)
    model.type == "ImageUpload"
  end

  def other?(*args)
    model.type == "FileUpload"
  end
end
