class AddPolymorphicComments < ActiveRecord::Migration[7.0]
  def change
    rename_column :comments, :post_id, :commentable_id
    add_column :comments, :commentable_type, :string
    add_index :comments, [:commentable_type, :commentable_id], name: :index_comments_on_commentable
    add_index :comments, [:commentable_type, :commentable_id, :user_id], name: :index_comments_on_commentable_and_user

    Comment.reset_column_information
    Comment.update_all(commentable_type: "Post")

    remove_index :comment_notifications, [:post_id, :user_id]
    rename_column :comment_notifications, :post_id, :comment_notificationable_id
    add_column :comment_notifications, :comment_notificationable_type, :string
    add_index(
      :comment_notifications,
      [:comment_notificationable_type, :comment_notificationable_id],
      name: :index_comment_notificationable
    )
    add_index(
      :comment_notifications,
      [:comment_notificationable_type, :comment_notificationable_id, :user_id],
      name: :index_comment_notificationable_and_user
    )

    CommentNotification.reset_column_information
    CommentNotification.update_all(comment_notificationable_type: "Post")
  end
end
