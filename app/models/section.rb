class Section < ApplicationRecord
  has_many :contents

  validates :name, presence: true, uniqueness: true

  accepts_nested_attributes_for :contents
end
