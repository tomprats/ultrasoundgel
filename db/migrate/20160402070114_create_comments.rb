class CreateComments < ActiveRecord::Migration[5.0]
  def change
    create_table :comments do |t|
      t.integer :post_id, index: true
      t.integer :user_id, index: true
      t.boolean :active, default: true
      t.text    :text
      t.boolean :anonymous

      t.timestamps null: false
    end

    add_index :comments, [:active, :created_at]
    add_column :users, :image, :string
  end
end
