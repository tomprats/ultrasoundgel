class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  # TODO: Remove
  def self.to_html(*attrs)
    attrs.each do |attr|
      define_method("#{attr}_to_html") do
        Rails.cache.fetch("#{self.class.name.downcase}-#{id}-#{attr}") do
          markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML, autolink: true, tables: true)
          markdown.render(self[attr] || "").html_safe
        end
      end
    end

    define_method("bust_html_cache") do
      attrs.each do |attr|
        Rails.cache.delete("#{self.class.name.downcase}-#{id}-#{attr}")
      end
    end

    after_save :bust_html_cache
  end

  # TODO: Remove
  def self.date_from(*attrs)
    attrs.each do |attr|
      define_method("#{attr}_date") do
        value = read_attribute attr
        value && value.strftime("%m/%d/%y %I:%M %p")
      end
    end
  end

  date_from :created_at, :updated_at
end
