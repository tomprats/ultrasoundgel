class Page < ActiveRecord::Base
  validates_presence_of :rank, :path, :name
  validates_uniqueness_of :path

  default_scope { order(:rank) }
  scope :active, -> { where(active: true) }

  before_validation :format_path

  private
  def format_path
    self.path = self.path.strip.downcase
  end
end
