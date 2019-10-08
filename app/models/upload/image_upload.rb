class ImageUpload < Upload
  has_many :channels, foreign_key: :image_id
  has_many :episodes, foreign_key: :image_id

  before_destroy :check_associations

  def self.podcast_approved_types
    ["png", "jpg", "jpeg"]
  end

  private

  def check_associations
    errors.add(:channels, "are still associated") if channels.exists?
    errors.add(:episodes, "are still associated") if episodes.exists?
    throw :abort if errors.any?
  end
end
