class AddPublicTags < ActiveRecord::Migration[6.0]
  def change
    add_column :apps, :public_tags, :string, array: true, default: []
    add_column :posts, :public_tags, :string, array: true, default: []
  end
end
