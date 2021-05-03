class Page < ApplicationRecord
  has_rich_text :content

  validates_presence_of :rank, :path, :name, :template
  validates_uniqueness_of :path

  default_scope{ order(:rank) }
  scope :active, ->{ where(active: true) }
  scope :by_rank, ->{ order(:rank, :name) }

  before_validation :format_path

  to_html :text

  def content_edit_value
    content.present? ? content.body.to_trix_html : text_to_html
  end

  def current_content
    content.present? ? content.body.to_s : text_to_html
  end

  # TODO: Remove?
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
