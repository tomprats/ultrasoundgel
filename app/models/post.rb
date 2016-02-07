class Post < ApplicationRecord
  include Published

  validates_presence_of :title

  belongs_to :episode

  def tag_list
    tags && tags.split(",").collect(&:trim)
  end
end
