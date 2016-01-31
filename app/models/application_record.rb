class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

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
