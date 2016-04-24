class ShareImageUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  storage :fog

  def store_dir
    "share/#{model.id}"
  end

  def filename
    "original.#{file.extension}" if original_filename
  end

  def default_url(*args)
    "/logo.jpg"
  end

  version :square do
    process resize_to_fill: [400, 400]

    def full_filename(for_file = model.file.file)
      "square.#{for_file.split(".").last}"
    end
  end
end
