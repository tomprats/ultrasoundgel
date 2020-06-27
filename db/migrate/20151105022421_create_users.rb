class CreateUsers < ActiveRecord::Migration[4.2]
  def change
    create_table :users do |t|
      t.boolean :admin, default: false, null: false, index: true
      t.string  :email,                 null: false, index: true
      t.string  :first_name,            null: false
      t.string  :last_name,             null: false
      t.string  :password_digest,       null: false

      t.timestamps                      null: false
    end

    add_index :users, [:last_name, :first_name]
  end
end
