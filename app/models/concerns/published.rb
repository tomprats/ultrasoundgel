module Published
  extend ActiveSupport::Concern

  included do
    def self.on_publish(&block)
      with_options if: :validate_publish, &block
    end

    def self.on_unpublish(&block)
      with_options if: :validate_unpublish, &block
    end

    def validate_publish
      published_at_changed? && published_at.present?
    end

    def validate_unpublish
      published_at_changed? && published_at.blank?
    end

    default_scope{ order(published_at: :desc) }

    scope :ascending, ->{ reorder("#{table_name}.published_at ASC") }
    scope :descending, ->{ reorder("#{table_name}.published_at DESC") }
    scope :unpublished, ->{
      where("#{table_name}.published_at IS NULL OR #{table_name}.published_at > ?", DateTime.now)
    }
    scope :published, ->{ where("#{table_name}.published_at <= ?", DateTime.now) }
    scope :scheduled, ->{ where("#{table_name}.published_at > ?", DateTime.now) }

    def published?
      published_before?(DateTime.now)
    end

    def published_before?(date)
      at = published_at_was || published_at
      at && at <= date
    end
  end
end
