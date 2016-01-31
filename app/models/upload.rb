class Upload < ApplicationRecord
  validates_presence_of :type, :name,
    :location, :size, :content_type

  default_scope { order(:created_at) }
  scope :podcast_approved, -> { where("content_type ilike any(array[?])", podcast_approved_types_sql) }

  before_create :set_type

  private
  def self.podcast_approved_types
    []
  end

  def self.podcast_approved_types_sql
    podcast_approved_types.collect { |t| "%#{t}%" }
  end

  def set_type
    self.type = "AudioUpload" if content_type.includes? "audio"
    self.type ||= "ImageUpload" if content_type.includes? "image"
    self.type ||= "FileUpload"
  end
end
