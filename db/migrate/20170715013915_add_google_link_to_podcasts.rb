class AddGoogleLinkToPodcasts < ActiveRecord::Migration[5.0]
  def change
    add_column :channels, :google_link, :string
    add_column :episodes, :google_link, :string
  end
end
