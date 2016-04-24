class RenameImageColumnsOnApps < ActiveRecord::Migration[5.0]
  def change
    App.update_all(share_image_id: nil, navbar_image_id: nil)
    rename_column :apps, :share_image_id, :share_image
    rename_column :apps, :navbar_image_id, :navbar_image
  end
end
