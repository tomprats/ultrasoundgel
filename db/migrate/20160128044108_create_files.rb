class CreateFiles < ActiveRecord::Migration
  def change
    create_table :files do |t|
      t.string  :type,         null: false, index: true
      t.string  :name,         null: false
      t.string  :location,     null: false
      t.string  :size,         null: false
      t.string  :content_type, null: false
      t.integer :duration

      t.timestamps             null: false
    end
  end
end
