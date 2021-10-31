class AddRedirectToChannels < ActiveRecord::Migration[7.0]
  def change
    add_column :channels, :redirect, :string
  end
end
