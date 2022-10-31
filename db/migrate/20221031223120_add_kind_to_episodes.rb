class AddKindToEpisodes < ActiveRecord::Migration[7.1]
  def change
    add_column :episodes, :kind, :string, default: "Full"
  end
end
