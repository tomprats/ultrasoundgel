class Upload < ApplicationRecord
  mount_uploader :file, FileUploader

  validates_presence_of :type, :name,
    :file, :size, :content_type

  default_scope{ order(:created_at) }
  scope :podcast_approved, ->{
    where("content_type ilike any(array[?])", podcast_approved_types_sql)
  }

  before_validation :set_uid, on: :create

  def extension
    file.url.split(".")[-1]
  end

  def to_param
    uid
  end

  class << self
    private

    def podcast_approved_types
      []
    end

    def podcast_approved_types_sql
      podcast_approved_types.collect{ |t| "%#{t}%" }
    end
  end

  private

  def set_uid
    self.uid = SecureRandom.urlsafe_base64
    set_uid if self.class.where(uid: uid).exists?
  end
end
