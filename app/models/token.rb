class Token < ApplicationRecord
  belongs_to :user

  after_create :reload

  def to_param
    uuid
  end
end
