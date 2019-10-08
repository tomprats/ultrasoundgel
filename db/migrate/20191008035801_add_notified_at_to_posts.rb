class AddNotifiedAtToPosts < ActiveRecord::Migration[6.0]
  def change
    add_column :posts, :notified_at, :datetime

    Post.update_all(notified_at: DateTime.now)
  end
end
