class Article < ApplicationRecord
  belongs_to :category, class_name: :ArticleCategory

  validates_presence_of :link, :title, :journal, :year, :month

  default_scope{ order(year: :desc, month: :desc) }
end
