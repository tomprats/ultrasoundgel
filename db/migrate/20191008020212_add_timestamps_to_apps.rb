class AddTimestampsToApps < ActiveRecord::Migration[6.0]
  def change
    return if column_exists?(:apps, :created_at)

    long_ago = DateTime.new(2000, 1, 1)

    add_timestamps :apps, null: true

    App.unscoped.update_all(created_at: long_ago, updated_at: long_ago)

    change_column_null :apps, :created_at, false
    change_column_null :apps, :updated_at, false
  end
end
