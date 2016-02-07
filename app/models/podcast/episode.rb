class Episode < ApplicationRecord
  include Published

  validates_presence_of :title, :uid

  on_publish do |record|
    record.validates_presence_of :audio, :image,
      :subtitle, :author, :summary
  end

  belongs_to :channel
  belongs_to :audio, class_name: AudioUpload
  belongs_to :image, class_name: ImageUpload
  has_one :post

  before_validation :set_uid, on: :create

  private
  def set_uid
    self.uid = SecureRandom.urlsafe_base64
    set_uid if self.class.where(uid: self.uid).exists?
  end
end
