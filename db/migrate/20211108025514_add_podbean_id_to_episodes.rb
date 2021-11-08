class AddPodbeanIdToEpisodes < ActiveRecord::Migration[7.0]
  def change
    add_column :episodes, :podbean_id, :string
  end
end
