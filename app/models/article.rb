class Article < ApplicationRecord
  belongs_to :category, class_name: :ArticleCategory, optional: false

  validates_presence_of :link, :title, :journal, :year, :month

  default_scope{ order(year: :desc, month: :desc) }
end
