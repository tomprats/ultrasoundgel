class Token < ApplicationRecord
  belongs_to :user

  after_create :reload, on: :create

  def to_param
    uuid
  end
end
