class NavbarImageUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  storage :fog

  def store_dir
    "navbar/#{model.id}"
  end

  def filename
    "original.#{file.extension}" if original_filename
  end

  def default_url(*args)
    "/logo.jpg"
  end

  version :small do
    process resize_to_fit: [4000000, 100] # Doesn't care about width

    def full_filename(for_file)
      for_file ||= model.file.file

      "small.#{for_file.split(".").last}"
    end
  end
end
