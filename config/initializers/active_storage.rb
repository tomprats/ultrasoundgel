Rails.application.config.active_storage.content_types_allowed_inline += [
  "audio/mp3",
  "audio/mp4",
  "audio/mpeg"
]

ActionText::ContentHelper.allowed_attributes.add "style"
ActionText::ContentHelper.allowed_attributes.add "controls"

ActionText::ContentHelper.allowed_tags.add "audio"
ActionText::ContentHelper.allowed_tags.add "source"
ActionText::ContentHelper.allowed_tags.add "video"
