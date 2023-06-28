# config valid for current version and patch releases of Capistrano
lock "~> 3.16.0"

set :application, "ultrasoundgel"
set :keep_releases, 3
set :repo_url, "git@github.com:tomprats/ultrasoundgel.git"

# Rails options
set :keep_assets, 3
append(
  :linked_dirs,
  "log",
  "tmp/pids",
  "tmp/cache",
  "tmp/sockets",
  "vendor/bundle",
  "node_modules",
  "public/packs",
  "public/system",
  "public/uploads"
)
append :linked_files, "config/credentials/production.key"
set :migration_role, :app

# Used in config

# Other plugin options
set :asdf_custom_path, "/opt/asdf"
set :init_system, :systemd
set :logrotate_user, "deploy"
set :logrotate_group, "deploy"
set :nginx_server_name, "www.ultrasoundgel.org"
# set :nginx_ssl_cert, "fullchain.pem"
# set :nginx_ssl_cert_path, "/etc/letsencrypt/live/www.ultrasoundgel.org/"
# set :nginx_ssl_cert_key, "privkey.pem"
# set :nginx_ssl_cert_key_path, "/etc/letsencrypt/live/www.ultrasoundgel.org/"
set :nginx_upload_local_cert, false
# set :nginx_use_ssl, true
set :pg_system_user, "deploy"
set :pg_without_sudo, true
set :pg_generate_random_password, true
set :service_unit_name, "sidekiq-#{fetch(:application)}-#{fetch(:stage)}.service"
set :sidekiq_config, "config/sidekiq.yml"
set :unicorn_logrotate_enabled, true

before "deploy:assets:precompile", "deploy:yarn_install"
namespace :deploy do
  desc "Run rake yarn install"
  task :yarn_install do
    on roles(:web) do
      within release_path do
        execute("cd #{release_path} && yarn install --silent --no-progress --no-audit --no-optional")
      end
    end
  end
end
