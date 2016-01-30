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

ActiveRecord::Schema.define(version: 20160128044108) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "files", force: :cascade do |t|
    t.string   "type",         null: false
    t.string   "name",         null: false
    t.string   "location",     null: false
    t.string   "size",         null: false
    t.string   "content_type", null: false
    t.integer  "duration"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "files", ["type"], name: "index_files_on_type", using: :btree

  create_table "pages", force: :cascade do |t|
    t.boolean  "active",     default: false, null: false
    t.integer  "rank",       default: 100,   null: false
    t.string   "path",                       null: false
    t.string   "name",                       null: false
    t.text     "text"
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
  end

  add_index "pages", ["active", "rank"], name: "index_pages_on_active_and_rank", using: :btree
  add_index "pages", ["path"], name: "index_pages_on_path", using: :btree
  add_index "pages", ["rank"], name: "index_pages_on_rank", using: :btree

  create_table "podcast_channel", force: :cascade do |t|
    t.integer  "image_id",                    null: false
    t.string   "title",                       null: false
    t.string   "subtitle",                    null: false
    t.string   "author",                      null: false
    t.string   "link",                        null: false
    t.string   "owner_name",                  null: false
    t.string   "owner_email",                 null: false
    t.string   "summary",                     null: false
    t.string   "category"
    t.boolean  "explicit",    default: false
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
  end

  create_table "podcast_episodes", force: :cascade do |t|
    t.integer  "audio_id",                     null: false
    t.integer  "image_id",                     null: false
    t.string   "uid",                          null: false
    t.string   "title",                        null: false
    t.string   "subtitle",                     null: false
    t.string   "author",                       null: false
    t.string   "summary",                      null: false
    t.boolean  "explicit",     default: false
    t.datetime "published_at"
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
  end

  add_index "podcast_episodes", ["published_at"], name: "index_podcast_episodes_on_published_at", using: :btree

  create_table "posts", force: :cascade do |t|
    t.integer  "podcast_episode_id"
    t.string   "title",              null: false
    t.text     "text"
    t.text     "tags"
    t.datetime "published_at"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
  end

  add_index "posts", ["podcast_episode_id"], name: "index_posts_on_podcast_episode_id", using: :btree
  add_index "posts", ["published_at"], name: "index_posts_on_published_at", using: :btree

  create_table "users", force: :cascade do |t|
    t.boolean  "admin",           default: false, null: false
    t.string   "email",                           null: false
    t.string   "first_name",                      null: false
    t.string   "last_name",                       null: false
    t.string   "password_digest",                 null: false
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
  end

  add_index "users", ["admin"], name: "index_users_on_admin", using: :btree
  add_index "users", ["email"], name: "index_users_on_email", using: :btree
  add_index "users", ["last_name", "first_name"], name: "index_users_on_last_name_and_first_name", using: :btree

end
