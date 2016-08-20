class AudioUpload < Upload
  validates_presence_of :duration

  def self.podcast_approved_types
    ["mp3", "mpeg"]
  end

  def duration_time
    format = duration >= 3600 ? "%H:%M:%S" : "%-m:%S"
    Time.at(duration).strftime(format)
  end
end
