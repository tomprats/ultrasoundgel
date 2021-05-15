class MoveUploadsToModals < ActiveRecord::Migration[7.0]
  def change
    rename_column :channels, :image_id, :legacy_image_id
    rename_column :episodes, :audio_id, :legacy_audio_id
    rename_column :episodes, :image_id, :legacy_image_id
    rename_column :users, :image, :legacy_image
  end
end
