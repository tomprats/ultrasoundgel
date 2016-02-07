class Channel < ApplicationRecord
  include Published

  validates_presence_of :title

  on_publish do |record|
    record.validates_presence_of :image, :subtitle,
      :author, :link, :owner_name, :owner_email, :summary
  end

  belongs_to :image

  def category_list
    categories && categories.split(",").collect(&:trim)
  end
end
