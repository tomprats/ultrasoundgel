require_relative "boot"

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "active_storage/engine"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_text/engine"
require "action_view/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Application
  class Application < Rails::Application
    config.load_defaults "7.0"

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
    config.active_record.logger = nil
    config.autoload_paths += Dir[Rails.root.join("app", "models", "{*/}")]
    config.cache_store = :memory_store
    config.eager_load_paths += Dir[Rails.root.join("app", "models", "{*/}")]
    config.generators.system_tests = nil
    config.time_zone = "Eastern Time (US & Canada)"
  end
end
