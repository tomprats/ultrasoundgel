class CreateEpisodeAudioStats < ActiveRecord::Migration[7.0]
  def change
    create_table :episode_audio_stats do |t|
      t.json :data, default: {}, null: false
      t.belongs_to :episode, index: true, null: false
      t.string :ip_address
      t.json :raw_data, default: {}, null: false

      t.timestamps
    end
  end
end
