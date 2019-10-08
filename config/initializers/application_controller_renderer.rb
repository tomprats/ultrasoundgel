# Be sure to restart your server when you modify this file.
if Rails.env.development?
  asset_host = "http://localhost:3000"
  host = "localhost:3000"
else
  asset_host = "https://www.ultrasoundgel.org"
  host = "www.ultrasoundgel.org"
end

Rails.application.config.action_mailer.asset_host = asset_host
Rails.application.config.action_mailer.default_url_options = {host: host}
Rails.application.routes.default_url_options[:host] = host
