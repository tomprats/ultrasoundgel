class CreateUploads < ActiveRecord::Migration
  def change
    create_table :uploads do |t|
      t.string  :type,         null: false, index: true
      t.string  :name,         null: false
      t.string  :file,         null: false
      t.string  :size,         null: false
      t.string  :content_type, null: false
      t.integer :duration

      t.timestamps             null: false
    end

    add_index :uploads, [:type, :name]
  end
end
