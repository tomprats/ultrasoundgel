class CreateArticles < ActiveRecord::Migration[5.1]
  def change
    create_table :article_categories do |t|
      t.integer :rank, default: 100, null: false, index: true
      t.string  :name,               null: false

      t.timestamps
    end

    create_table :articles do |t|
      t.references :category, index: true, null: false
      t.string :link,    null: false
      t.string :title,   null: false
      t.string :journal, null: false
      t.integer :year,   null: false
      t.integer :month,  null: false

      t.timestamps
    end
  end
end
