class ImageUpload < Upload
  def self.podcast_approved_types
    ["png", "jpg", "jpeg"]
  end
end
