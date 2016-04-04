# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20160402070114) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "apps", force: :cascade do |t|
    t.string "share_title"
    t.string "share_description"
    t.string "share_image_id"
    t.string "navbar_image_id"
    t.string "contact_email"
    t.string "twitter"
    t.string "facebook"
    t.string "instagram"
    t.string "google_analytics_code"
    t.text   "sidebar"
  end

  create_table "channels", force: :cascade do |t|
    t.integer  "image_id"
    t.string   "uid",                          null: false
    t.string   "title",                        null: false
    t.string   "subtitle"
    t.string   "author"
    t.string   "link"
    t.string   "owner_name"
    t.string   "owner_email"
    t.string   "summary"
    t.string   "categories"
    t.boolean  "explicit",     default: false
    t.datetime "published_at"
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.index ["published_at"], name: "index_channels_on_published_at", using: :btree
  end

  create_table "comments", force: :cascade do |t|
    t.integer  "post_id"
    t.integer  "user_id"
    t.boolean  "active",     default: true
    t.text     "text"
    t.boolean  "anonymous"
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.index ["active", "created_at"], name: "index_comments_on_active_and_created_at", using: :btree
    t.index ["post_id"], name: "index_comments_on_post_id", using: :btree
    t.index ["user_id"], name: "index_comments_on_user_id", using: :btree
  end

  create_table "episodes", force: :cascade do |t|
    t.integer  "channel_id"
    t.integer  "audio_id"
    t.integer  "image_id"
    t.string   "uid",                          null: false
    t.string   "title",                        null: false
    t.string   "subtitle"
    t.string   "author"
    t.string   "summary"
    t.boolean  "explicit",     default: false
    t.datetime "published_at"
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.index ["channel_id"], name: "index_episodes_on_channel_id", using: :btree
    t.index ["published_at", "channel_id"], name: "index_episodes_on_published_at_and_channel_id", using: :btree
    t.index ["published_at"], name: "index_episodes_on_published_at", using: :btree
  end

  create_table "pages", force: :cascade do |t|
    t.boolean  "active",     default: false, null: false
    t.integer  "rank",       default: 100,   null: false
    t.string   "path",                       null: false
    t.string   "name",                       null: false
    t.text     "text"
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.index ["active", "rank"], name: "index_pages_on_active_and_rank", using: :btree
    t.index ["path"], name: "index_pages_on_path", using: :btree
    t.index ["rank"], name: "index_pages_on_rank", using: :btree
  end

  create_table "posts", force: :cascade do |t|
    t.integer  "episode_id"
    t.string   "uid",          null: false
    t.string   "title",        null: false
    t.text     "text"
    t.text     "tags"
    t.datetime "published_at"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.index ["episode_id"], name: "index_posts_on_episode_id", using: :btree
    t.index ["published_at"], name: "index_posts_on_published_at", using: :btree
  end

  create_table "uploads", force: :cascade do |t|
    t.string   "type",         null: false
    t.string   "uid",          null: false
    t.string   "name",         null: false
    t.string   "file",         null: false
    t.string   "size",         null: false
    t.string   "content_type", null: false
    t.integer  "duration"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.index ["type", "name"], name: "index_uploads_on_type_and_name", using: :btree
    t.index ["type"], name: "index_uploads_on_type", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.boolean  "admin",           default: false, null: false
    t.string   "email",                           null: false
    t.string   "first_name",                      null: false
    t.string   "last_name",                       null: false
    t.string   "password_digest",                 null: false
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
    t.string   "image"
    t.index ["admin"], name: "index_users_on_admin", using: :btree
    t.index ["email"], name: "index_users_on_email", using: :btree
    t.index ["last_name", "first_name"], name: "index_users_on_last_name_and_first_name", using: :btree
  end

end
