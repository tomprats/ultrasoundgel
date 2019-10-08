class CreateApps < ActiveRecord::Migration[5.0]
  def change
    create_table :apps do |t|
      t.string :share_title
      t.string :share_description
      t.string :share_image_id
      t.string :navbar_image_id
      t.string :contact_email
      t.string :twitter
      t.string :facebook
      t.string :instagram
      t.string :google_analytics_code
      t.text   :sidebar
      t.timestamps
    end

    App.default
  end
end
