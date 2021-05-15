Rails.application.config.active_job.queue_adapter = :sidekiq

redis = {url: "redis://localhost:6379/0"}
Sidekiq.configure_client do |config|
  config.redis = redis
end
Sidekiq.configure_server do |config|
  config.redis = redis
end

Rails.application.reloader.to_prepare do
  Sidekiq::Cron::Job.load_from_hash!(
    YAML.safe_load(File.open("config/sidekiq_schedule.yml"))
  ) if Sidekiq.server?
end
