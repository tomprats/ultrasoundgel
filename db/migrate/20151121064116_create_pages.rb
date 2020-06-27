class CreatePages < ActiveRecord::Migration[4.2]
  def change
    create_table :pages do |t|
      t.boolean :active, default: false, null: false
      t.integer :rank,   default: 100,   null: false, index: true
      t.string  :path,                   null: false, index: true
      t.string  :name,                   null: false
      t.text    :text

      t.timestamps null: false
    end

    add_index :pages, [:active, :rank]
  end
end
