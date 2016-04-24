class App < ApplicationRecord
  mount_uploader :share_image, ShareImageUploader
  mount_uploader :navbar_image, NavbarImageUploader

  validate :only_one

  to_html :announcements, :resources

  def self.default
    app ||= App.first
    app ||= App.create(
      share_title: "Ultrasound GEL",
      share_description: "The Ultrasound GEL Podcast",
      contact_email: "michaelpratsmd@gmail.com"
    )
  end

  private
  def only_one
    one = id ? App.count == 1 : App.count.zero?
    errors.add(:id, "already exists") unless one
  end
end
