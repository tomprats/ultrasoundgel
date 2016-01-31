class CreatePodcasts < ActiveRecord::Migration
  def change
    create_table :podcast_episodes do |t|
      t.integer :audio_id, null: false
      t.integer :image_id, null: false
      t.string  :uid,      null: false
      t.string  :title,    null: false
      t.string  :subtitle, null: false
      t.string  :author,   null: false
      t.string  :summary,  null: false
      t.boolean :explicit, default: false

      t.timestamp :published_at, index: true
      t.timestamps         null: false
    end

    create_table :podcast_channel do |t|
      t.integer :image_id,    null: false
      t.string  :title,       null: false
      t.string  :subtitle,    null: false
      t.string  :author,      null: false
      t.string  :link,        null: false
      t.string  :owner_name,  null: false
      t.string  :owner_email, null: false
      t.string  :summary,     null: false
      t.string  :categories
      t.boolean :explicit, default: false

      t.timestamp :published_at, index: true
      t.timestamps            null: false
    end
  end
end
