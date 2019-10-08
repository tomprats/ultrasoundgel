class Page < ApplicationRecord
  validates_presence_of :rank, :path, :name, :template
  validates_uniqueness_of :path

  default_scope{ order(:rank) }
  scope :active, ->{ where(active: true) }

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

  def self.templates
    return @files if @files
    @files = Dir.glob("#{Rails.root}/app/views/templates/*")
    @files.compact!
    @files.collect!{ |file| file.split("/").last.split(".").first }
    @files.sort_by!{ |f| f == "default" ? "" : f } # Default First
  end

  private

  def format_path
    self.path = path.strip.downcase
  end
end
