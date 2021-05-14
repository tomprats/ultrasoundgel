Rails.application.config.active_job.queue_adapter = :sidekiq

Rails.application.reloader.to_prepare do
  Sidekiq::Cron::Job.load_from_hash!(
    YAML.safe_load(File.open("config/sidekiq_schedule.yml"))
  ) if Sidekiq.server?
end
