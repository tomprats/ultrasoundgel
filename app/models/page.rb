class Page < ApplicationRecord
  validates_presence_of :rank, :path, :name
  validates_uniqueness_of :path

  default_scope { order(:rank) }
  scope :active, -> { where(active: true) }

  before_validation :format_path

  to_html :text

  def self.home
    @home = Page.find_by(path: :home)
    @home ||= Page.create(
      active: true,
      path: :home,
      name: "Home",
      rank: 0
    )
  end

  private
  def format_path
    self.path = self.path.strip.downcase
  end
end
