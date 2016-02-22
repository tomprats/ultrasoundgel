# Be sure to restart your server when you modify this file.

options = Rails.application.config.action_mailer.default_url_options
Rails.application.routes.default_url_options[:host] = options[:host]
