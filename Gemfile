source "https://rubygems.org"

ruby "2.6.0"

gem "aws-sdk-s3"
gem "bcrypt"
gem "haml"
gem "image_processing"
gem "pg"
gem "rails", github: "tomprats/rails", branch: "active-storage-byte-range"
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
  gem "thin"
end
