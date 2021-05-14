class EpisodeAudioStatsJob < ApplicationJob
  def perform(
    episode_id,
    accept_language: nil,
    ip_address: nil,
    range: nil,
    referer: nil,
    user_agent: nil
  )
    EpisodeAudioStat.create!(
      episode_id: episode_id,
      ip_address: ip_address.presence,
      raw_data: {
        accept_language: accept_language,
        range: range,
        referer: referer,
        user_agent: user_agent
      }
    )
  end
end
