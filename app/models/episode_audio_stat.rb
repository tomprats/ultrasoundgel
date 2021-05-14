class EpisodeAudioStat < ApplicationRecord
  belongs_to :episode

  before_create :set_initial_data

  def from_homepage?
    return unless raw_data["referer"].present?

    request = raw_data["referer"]
      .chomp("/")
      .delete_prefix("http://")
      .delete_prefix("https://")

    request == Rails.application.routes.default_url_options[:host]
  end

  def self.episode_counts
    group(:episode_id).count
  end

  def self.downloads
    count
  end

  def self.monthly_downloads
    totals = group("date_trunc('year', created_at), date_trunc('month', created_at)").count
    totals.keys.sort.map{ |date| {date: date.strftime("%B %Y"), total: totals[date]} }.reverse
  end

  def self.recent(since = 1.month)
    where("created_at >= :date", {date: since.ago})
  end

  def self.unique_downloads
    return select(:ip_address).distinct.count if scope_attributes?

    select(:episode_id, :ip_address).distinct.to_a.count
  end

  private

  def set_initial_data
    browser = Browser.new(raw_data["user_agent"], accept_language: raw_data["accept_language"])
    language = browser.accept_language&.first

    self.data ||= {}
    self.data.merge!(
      bot: browser.bot&.name,
      browswer_name: browser.name,
      browswer_version: browser.version,
      device_id: browser.device.id,
      device_name: browser.device.name,
      locale_code: language&.code,
      locale_country: language&.region,
      platform_name: browser.platform.name,
      platform_version: browser.platform.version
    )
  end
end
