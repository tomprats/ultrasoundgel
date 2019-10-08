class Comment < ApplicationRecord
  belongs_to :post
  belongs_to :user

  validates_presence_of :post, :text

  default_scope{ where(active: true).order(:created_at) }

  def image
    i = user.image.thumbnail.url if user && user.image && !anonymous
    i || "/logo.jpg"
  end

  def name
    n = user.name if user && !anonymous
    n || "Anonymous"
  end
end
