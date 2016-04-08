class CreatePostNotifications < ActiveRecord::Migration[5.0]
  def change
    create_table :comment_notifications do |t|
      t.integer :post_id, index: true, null: false
      t.integer :user_id, index: true, null: false

      t.timestamps
    end

    add_index :comment_notifications, [:post_id, :user_id]
    add_column :users, :post_notifications, :boolean, default: false
    add_column :apps, :announcements, :text
    rename_column :apps, :sidebar, :resources
  end
end
