source "https://rubygems.org"

ruby "2.6.0"

gem "rails"
gem "pg"

# Uploads
gem "aws-sdk-s3"
gem "carrierwave"
gem "fog-aws"
gem "mini_magick"
gem "sidekiq", "~> 5.1"
gem "sidekiq-cron"
gem "taglib-ruby"

# OpenSSH
gem "bcrypt_pbkdf"
gem "ed25519"

# Users
gem "bcrypt"

# Views
gem "bootstrap-sass"
gem "coffee-rails"
gem "font-awesome-rails"
gem "jquery-rails"
gem "jquery-turbolinks"
gem "haml"
gem "recaptcha", require: "recaptcha/rails"
gem "redcarpet"
gem "sass-rails"
gem "turbolinks"
gem "uglifier"

group :development do
  gem "capistrano-logrotate"
  gem "capistrano-postgresql"
  gem "capistrano-rails"
  gem "capistrano-rails-collection"
  gem "capistrano-rvm"
  gem "capistrano-sidekiq"
  gem "capistrano-unicorn-nginx",
    branch: "systemd",
    github: "capistrano-plugins/capistrano-unicorn-nginx"

  gem "better_errors"
  gem "binding_of_caller"
  gem "listen"
  gem "pry"
  gem "rubocop-traitify"
  gem "spring"
  gem "thin"
end

group :production do
  gem "unicorn"
end
