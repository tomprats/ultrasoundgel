class CreateTokens < ActiveRecord::Migration[5.1]
  def change
    enable_extension "uuid-ossp"

    create_table :tokens do |t|
      t.integer "user_id", null: false, index: true
      t.uuid "uuid", default: ->{ "uuid_generate_v4()" }, null: false
      t.timestamps
    end
  end
end
