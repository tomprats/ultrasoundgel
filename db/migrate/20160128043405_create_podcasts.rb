class CreatePodcasts < ActiveRecord::Migration
  def change
    create_table :episodes do |t|
      t.integer :channel_id, index: true
      t.integer :audio_id
      t.integer :image_id
      t.string  :uid,   null: false
      t.string  :title, null: false
      t.string  :subtitle
      t.string  :author
      t.string  :summary
      t.boolean :explicit, default: false

      t.timestamp :published_at, index: true
      t.timestamps      null: false
    end

    add_index :episodes, [:published_at, :channel_id]

    create_table :channels do |t|
      t.integer :image_id
      t.string  :title, null: false
      t.string  :subtitle
      t.string  :author
      t.string  :link
      t.string  :owner_name
      t.string  :owner_email
      t.string  :summary
      t.string  :categories
      t.boolean :explicit, default: false

      t.timestamp :published_at, index: true
      t.timestamps      null: false
    end
  end
end
