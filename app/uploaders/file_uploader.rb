require "taglib"
class FileUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  storage :fog

  process :set_model

  def store_dir
    "upload/#{model.try(:uid) || model.id}"
  end

  def filename
    "original.#{file.extension}" if original_filename
  end

  version :large, if: :image? do
    process resize_to_fill: [1400, 1400]

    def full_filename(for_file)
      for_file ||= model.file.file

      "large.#{for_file.split(".").last}"
    end
  end

  def set_model
    model.type = "AudioUpload" if file.content_type.include? "audio"
    model.type ||= "ImageUpload" if file.content_type.include? "image"
    model.type ||= "FileUpload"

    model.size = file.size
    model.content_type = file.content_type

    TagLib::FileRef.open(file.path){ |ref| model.duration = ref.audio_properties.length_in_seconds } if audio?
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
