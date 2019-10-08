require File.expand_path("../boot", __FILE__)

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
require "sprockets/railtie"
# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

# Load local ENV vars
local_env = "config/local_variables.rb"
load(local_env) if File.exists?(local_env)

module Application
  class Application < Rails::Application
    config.load_defaults "6.0"

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
    config.time_zone = "Eastern Time (US & Canada)"
    config.autoload_paths += Dir[Rails.root.join("app", "models", "{*/}")]
    config.eager_load_paths += Dir[Rails.root.join("app", "models", "{*/}")]
  end
end
