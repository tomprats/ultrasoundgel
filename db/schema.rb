# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171214073826) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_record_internal_metadatas", id: false, force: :cascade do |t|
    t.string "key", limit: 191, null: false
    t.string "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["key"], name: "unique_active_record_internal_metadatas", unique: true
  end

  create_table "apps", id: :serial, force: :cascade do |t|
    t.string "share_title"
    t.string "share_description"
    t.string "share_image"
    t.string "navbar_image"
    t.string "contact_email"
    t.string "twitter"
    t.string "facebook"
    t.string "instagram"
    t.string "google_analytics_code"
    t.text "resources"
    t.text "announcements"
  end

  create_table "article_categories", force: :cascade do |t|
    t.integer "rank", default: 100, null: false
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["rank"], name: "index_article_categories_on_rank"
  end

  create_table "articles", force: :cascade do |t|
    t.bigint "category_id", null: false
    t.string "link", null: false
    t.string "title", null: false
    t.string "journal", null: false
    t.integer "year", null: false
    t.integer "month", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category_id"], name: "index_articles_on_category_id"
  end

  create_table "channels", id: :serial, force: :cascade do |t|
    t.integer "image_id"
    t.string "uid", null: false
    t.string "title", null: false
    t.string "subtitle"
    t.string "author"
    t.string "link"
    t.string "owner_name"
    t.string "owner_email"
    t.string "summary"
    t.string "categories"
    t.boolean "explicit", default: false
    t.datetime "published_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "itunes_link"
    t.string "google_link"
    t.index ["published_at"], name: "index_channels_on_published_at"
  end

  create_table "comment_notifications", id: :serial, force: :cascade do |t|
    t.integer "post_id", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["post_id", "user_id"], name: "index_comment_notifications_on_post_id_and_user_id"
    t.index ["post_id"], name: "index_comment_notifications_on_post_id"
    t.index ["user_id"], name: "index_comment_notifications_on_user_id"
  end

  create_table "comments", id: :serial, force: :cascade do |t|
    t.integer "post_id"
    t.integer "user_id"
    t.boolean "active", default: true
    t.text "text"
    t.boolean "anonymous"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["active", "created_at"], name: "index_comments_on_active_and_created_at"
    t.index ["post_id"], name: "index_comments_on_post_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "episodes", id: :serial, force: :cascade do |t|
    t.integer "channel_id"
    t.integer "audio_id"
    t.integer "image_id"
    t.string "uid", null: false
    t.string "title", null: false
    t.string "subtitle"
    t.string "author"
    t.string "summary"
    t.boolean "explicit", default: false
    t.datetime "published_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "itunes_link"
    t.string "google_link"
    t.index ["channel_id"], name: "index_episodes_on_channel_id"
    t.index ["published_at", "channel_id"], name: "index_episodes_on_published_at_and_channel_id"
    t.index ["published_at"], name: "index_episodes_on_published_at"
  end

  create_table "pages", id: :serial, force: :cascade do |t|
    t.boolean "active", default: false, null: false
    t.integer "rank", default: 100, null: false
    t.string "path", null: false
    t.string "name", null: false
    t.text "text"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "template", null: false
    t.index ["active", "rank"], name: "index_pages_on_active_and_rank"
    t.index ["path"], name: "index_pages_on_path"
    t.index ["rank"], name: "index_pages_on_rank"
  end

  create_table "posts", id: :serial, force: :cascade do |t|
    t.integer "episode_id"
    t.string "uid", null: false
    t.string "title", null: false
    t.text "text"
    t.text "tags"
    t.datetime "published_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["episode_id"], name: "index_posts_on_episode_id"
    t.index ["published_at"], name: "index_posts_on_published_at"
  end

  create_table "uploads", id: :serial, force: :cascade do |t|
    t.string "type", null: false
    t.string "uid", null: false
    t.string "name", null: false
    t.string "file", null: false
    t.string "size", null: false
    t.string "content_type", null: false
    t.integer "duration"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["type", "name"], name: "index_uploads_on_type_and_name"
    t.index ["type"], name: "index_uploads_on_type"
  end

  create_table "users", id: :serial, force: :cascade do |t|
    t.boolean "admin", default: false, null: false
    t.string "email", null: false
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "password_digest", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "image"
    t.boolean "post_notifications", default: false
    t.index ["admin"], name: "index_users_on_admin"
    t.index ["email"], name: "index_users_on_email"
    t.index ["last_name", "first_name"], name: "index_users_on_last_name_and_first_name"
  end

end
