class Page < ApplicationRecord
  has_rich_text :content

  validates_presence_of :rank, :path, :name, :template
  validates_uniqueness_of :path

  default_scope{ order(:rank) }
  scope :active, ->{ where(active: true) }

  before_validation :format_path

  to_html :text

  def current_content
    content.present? ? content.body.to_html : text_to_html
  end

  def self.find_or_create_home
    Page.create_with(
      active: true,
      path: :home,
      name: "Home",
      rank: 0
    ).find_or_create_by(path: :home)
  end

  def self.templates
    [
      "default",
      "articles",
      "contact",
      "home"
    ]
  end

  private

  def format_path
    self.path = path.strip.downcase
  end
end
