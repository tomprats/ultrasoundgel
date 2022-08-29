class Case < ApplicationRecord
  include Published

  has_many :comments, as: :commentable
  has_rich_text :content

  validates_presence_of :title

  before_validation :set_uid, on: :create

  def content_edit_value
    content.body.to_trix_html
  end

  def current_content
    content.body.to_s
  end

  def to_param
    uid
  end

  private

  def set_uid
    self.uid = SecureRandom.urlsafe_base64

    set_uid if self.class.where(uid: uid).exists?
  end
end
