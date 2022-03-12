class AddPodbeanPublishedAtToEpisodes < ActiveRecord::Migration[7.0]
  def change
    add_column :episodes, :podbean_published_at, :datetime

    reversible do |dir|
      dir.up do
        Episode.published.ascending
          .where(podbean_published_at: nil)
          .update_all(podbean_published_at: DateTime.now)
      end
    end
  end
end
