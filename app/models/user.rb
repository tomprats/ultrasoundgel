class User < ApplicationRecord
  has_one_attached :image do |attachable|
    attachable.variant :thumb, resize_to_limit: [400, 400]
  end

  mount_uploader :legacy_image, ImageUploader

  has_many :comments, dependent: :destroy
  has_many :comment_notifications, dependent: :destroy
  has_many :tokens, dependent: :destroy

  validates_presence_of :email, :first_name, :last_name
  validates_uniqueness_of :email
  validates_format_of :email, with: URI::MailTo::EMAIL_REGEXP
  has_secure_password

  before_validation :format_email

  default_scope{ order(:created_at) }
  scope :admin, ->{ where(admin: true) }

  def current_image
    image.attached? ? image.url : legacy_image&.file&.url
  end

  def current_image_thumbnail
    image.attached? ? image.variant(:thumb).processed.url : legacy_image&.thumbnail&.file&.url
  end

  def name
    "#{first_name} #{last_name}"
  end

  def token
    @token ||= tokens.first || tokens.create
  end

  def tom?
    email == "tprats108@gmail.com"
  end

  private

  def format_email
    self.email = email.strip.downcase
  end
end
