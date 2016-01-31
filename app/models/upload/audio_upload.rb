class AudioUpload < Upload
  validates_presence_of :duration

  def self.podcast_approved_types
    ["mp3", "mpeg"]
  end
end
