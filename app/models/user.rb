class User < ApplicationRecord
  has_one_attached :image
  mount_uploader :legacy_image, ImageUploader

  has_many :comments
  has_many :comment_notifications
  has_many :tokens, dependent: :destroy

  validates_presence_of :email, :first_name, :last_name
  validates_uniqueness_of :email
  validates :email, format: /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i
  has_secure_password

  before_validation :format_email

  default_scope{ order(:created_at) }
  scope :admin, ->{ where(admin: true) }

  def current_image
    image.attached? ? image.url : legacy_image&.file&.url
  end

  def current_image_thumbnail
    image.attached? ? image.variant(resize_to_limit: [400, 400]).url : legacy_image&.thumbnail&.file&.url
  end

  def name
    "#{first_name} #{last_name}"
  end

  def token
    @token ||= tokens.first || tokens.create
  end

  private

  def format_email
    self.email = email.strip.downcase
  end
end
