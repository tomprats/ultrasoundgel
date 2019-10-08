class AddEpisodeNumber < ActiveRecord::Migration[6.0]
  def change
    add_column :episodes, :number, :integer

    Episode.ascending.published.each_with_index do |episode, index|
      episode.update(number: index + 1)
    end
  end
end
