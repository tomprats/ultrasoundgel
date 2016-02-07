module Published
  extend ActiveSupport::Concern

  included do
    attr_accessor :validate_publishing

    def self.on_publish(&block)
      with_options if: :validate_publishing, &block
    end

    default_scope { order(:published_at) }

    scope :unpublished, -> { where(published_at: nil) }
    scope :published, -> { where("published_at >= ?", DateTime.now) }
    scope :scheduled, -> { where("published_at < ?", DateTime.now) }

    date_from :published_at
  end
end
