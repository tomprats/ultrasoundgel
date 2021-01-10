class Content < ApplicationRecord
  belongs_to :section
  has_one_attached :file
  has_rich_text :html

  validates :kind, presence: true
  validates :name, presence: true, uniqueness: {scope: :section_id}

  def edit_value
    kind == "HTML" ? html&.body&.to_trix_html : value
  end

  def value
    case kind
    when "Boolean"
      data["value"] # Verify boolean
    when "File"
      file.url
    when "String"
      data["value"]
    when "HTML"
      html.to_s
    end
  rescue Module::DelegationError
    nil
  end

  def value=(value)
    case kind
    when "Boolean", "String"
      self.data ||= {}
      self.data["value"] = value
    when "File"
      self.file = value
    when "HTML"
      self.html = value
    end
  end
end
