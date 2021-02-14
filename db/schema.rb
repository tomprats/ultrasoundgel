# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_01_17_031109) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "uuid-ossp"

  create_table "action_text_rich_texts", force: :cascade do |t|
    t.string "name", null: false
    t.text "body"
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["record_type", "record_id", "name"], name: "index_action_text_rich_texts_uniqueness", unique: true
  end

  create_table "active_record_internal_metadatas", id: false, force: :cascade do |t|
    t.string "key", limit: 191, null: false
    t.string "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["key"], name: "unique_active_record_internal_metadatas", unique: true
  end

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.string "service_name", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
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
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "announcements"
    t.string "public_tags", default: [], array: true
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
    t.integer "legacy_image_id"
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

  create_table "contents", force: :cascade do |t|
    t.bigint "section_id", null: false
    t.string "name", null: false
    t.string "kind", null: false
    t.json "data", default: {}, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["name"], name: "index_contents_on_name"
    t.index ["section_id"], name: "index_contents_on_section_id"
  end

  create_table "episodes", id: :serial, force: :cascade do |t|
    t.integer "channel_id"
    t.integer "legacy_audio_id"
    t.integer "legacy_image_id"
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
    t.integer "number"
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
    t.datetime "notified_at"
    t.string "public_tags", default: [], array: true
    t.index ["episode_id"], name: "index_posts_on_episode_id"
    t.index ["published_at"], name: "index_posts_on_published_at"
  end

  create_table "sections", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["name"], name: "index_sections_on_name", unique: true
  end

  create_table "tokens", force: :cascade do |t|
    t.integer "user_id", null: false
    t.uuid "uuid", default: -> { "uuid_generate_v4()" }, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_tokens_on_user_id"
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
    t.string "legacy_image"
    t.boolean "post_notifications", default: false
    t.index ["admin"], name: "index_users_on_admin"
    t.index ["email"], name: "index_users_on_email"
    t.index ["last_name", "first_name"], name: "index_users_on_last_name_and_first_name"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
end
