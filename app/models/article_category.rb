class ArticleCategory < ApplicationRecord
  has_many :articles, foreign_key: :category_id, dependent: :destroy

  validates_presence_of :rank, :name

  default_scope{ order(:rank, :name) }
  scope :by_rank, ->{ order(:rank) }
end
