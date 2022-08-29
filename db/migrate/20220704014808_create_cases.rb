class CreateCases < ActiveRecord::Migration[7.0]
  def change
    create_table :cases do |t|
      t.string  :uid,   null: false
      t.string  :title, null: false
      t.text    :tags
      t.string  :public_tags, array: true, default: []

      t.timestamp :notified_at
      t.timestamp :published_at, index: true
      t.timestamps
    end
  end
end
