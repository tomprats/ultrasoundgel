class Upload < ApplicationRecord
  mount_uploader :file, FileUploader

  validates_presence_of :type, :name,
    :file, :size, :content_type

  default_scope { order(:created_at) }
  scope :podcast_approved, -> { where("content_type ilike any(array[?])", podcast_approved_types_sql) }

  private
  def self.podcast_approved_types
    []
  end

  def self.podcast_approved_types_sql
    podcast_approved_types.collect { |t| "%#{t}%" }
  end
end
