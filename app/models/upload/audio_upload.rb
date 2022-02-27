class AudioUpload < Upload
  validates_presence_of :duration

  has_many :episodes, foreign_key: :legacy_audio_id

  before_destroy :check_associations

  def self.podcast_approved_types
    ["m4a", "mp3", "mpeg"]
  end

  def duration_time
    format = duration >= 3600 ? "%H:%M:%S" : "%-M:%S"
    Time.at(duration).strftime(format)
  end

  private

  def check_associations
    errors.add(:episodes, "are still associated") if episodes.exists?
    throw :abort if errors.any?
  end
end
