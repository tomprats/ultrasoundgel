source "https://rubygems.org"

ruby "2.7.1"

gem "activestorage-audio"
gem "aws-sdk-s3"
gem "bcrypt"
gem "browser", require: "browser/browser"
gem "haml"
gem "http"
gem "image_processing"
gem "pg"
gem "rails", github: "rails/rails", ref: "9b6abb50b2c99fe4c5b1249367f790d30fc1e64d"
gem "recaptcha", require: "recaptcha/rails"
gem "sidekiq"
gem "sidekiq-cron"
gem "taglib-ruby"
gem "unicorn"
gem "webpacker"

# OpenSSH
gem "bcrypt_pbkdf"
gem "ed25519"

# To Replace
gem "carrierwave"
gem "fog-aws"
gem "mini_magick"
gem "redcarpet"

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
end
