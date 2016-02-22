class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.integer :episode_id, index: true
      t.string  :uid,   null: false
      t.string  :title, null: false
      t.text    :text
      t.text    :tags

      t.timestamp :published_at,     index: true
      t.timestamps      null: false
    end
  end
end
