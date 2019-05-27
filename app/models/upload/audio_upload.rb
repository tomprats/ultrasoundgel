class AudioUpload < Upload
  validates_presence_of :duration

  has_many :episodes, foreign_key: :audio_id

  before_destroy :check_associations

  def self.podcast_approved_types
    ["mp3", "mpeg"]
  end

  def duration_time
    format = duration >= 3600 ? "%H:%M:%S" : "%-M:%S"
    Time.at(duration).strftime(format)
  end

  def add_tag
    s3 = Aws::S3::Client.new
    tag_set = s3.get_object_tagging(bucket: ENV["AWS_BUCKET"], key: file.path).tag_set
    tag_set.delete_if { |tag| tag[:key] == "episode" }
    tag_set.push(key: "episode", value: "audio")
    s3.put_object_tagging(bucket: ENV["AWS_BUCKET"], key: file.path, tagging: { tag_set: tag_set })
  end

  def remove_tag
    s3 = Aws::S3::Client.new
    tag_set = s3.get_object_tagging(bucket: ENV["AWS_BUCKET"], key: file.path).tag_set
    tag_set.delete_if { |tag| tag[:key] == "episode" }
    s3.put_object_tagging(bucket: ENV["AWS_BUCKET"], key: file.path, tagging: { tag_set: tag_set })
  end

  private
  def check_associations
    errors.add(:episodes, "are still associated") if episodes.exists?
    throw :abort if errors.any?
  end
end
