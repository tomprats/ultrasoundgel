class Episode < ApplicationRecord
  include EpisodeStats
  include Published

  has_one_attached :audio
  has_rich_text :description
  has_one_attached :image
  has_one :action_text_rich_text, as: :record, class_name: "ActionText::RichText"
  has_many :audio_stats, class_name: "EpisodeAudioStat"

  validates_presence_of :title, :uid
  validate :channel_check, if: :channel_id_changed?

  on_publish do |record|
    record.validates_presence_of(
      :author,
      :channel,
      :subtitle
    )
    record.validate :audio_ready!
    record.validate :description_ready!
    record.validate :image_ready!
    record.validate :publishable
  end

  on_unpublish do |record|
    record.validate :unpublishable
  end

  belongs_to :channel
  belongs_to :legacy_audio, class_name: "AudioUpload", optional: true
  belongs_to :legacy_image, class_name: "ImageUpload", optional: true
  has_one :post

  before_validation :set_uid, on: :create
  before_save :publish, if: -> (episode){ episode.published_at_changed? && episode.published_at }
  before_destroy :unpublished!

  after_save :update_podbean

  def self.search(value)
    result = left_joins(:post)
    sql = <<-SQL
      episodes.title ILIKE :search
      OR array_to_string(posts.public_tags, ',') ILIKE :search
      OR posts.tags ILIKE :search
      OR posts.title ILIKE :search
    SQL
    value.split(",").collect(&:strip).each do |v|
      result = result.where(sql, search: "%#{v}%")
    end
    result
  end

  def audio_duration
    return audio.blob.metadata[:duration]&.to_i if audio.attached?
    legacy_audio.duration_time if legacy_audio.present?
  end

  def audio_extension
    return audio.blob.filename.extension if audio.attached?
    legacy_audio.extension if legacy_audio.present?
  end

  def audio_size
    return audio.blob.byte_size if audio.attached?
    legacy_audio.size if legacy_audio.present?
  end

  def audio_type
    return audio.blob.content_type if audio.attached?
    legacy_audio.content_type if legacy_audio.present?
  end

  def current_audio(disposition: nil, proxy: false)
    return legacy_audio&.file&.url unless audio.attached?
    return audio.url(disposition: disposition) unless proxy

    Rails.application.routes.url_helpers.rails_storage_proxy_path(audio, disposition: disposition)
  end

  def current_description
    current_description_html
  end

  def current_description_html
    description.present? ? description.body.to_s : summary
  end

  def current_description_text
    description.present? ? description.body.to_plain_text : summary
  end

  def current_image(proxy: false)
    return legacy_image&.file&.url unless image.attached?
    return image.url unless proxy

    Rails.application.routes.url_helpers.rails_storage_proxy_path(image)
  end

  def description_edit_value
    description.present? ? description.body.to_trix_html : summary
  end

  def image_extension
    return image.blob.filename.extension if image.attached?
    legacy_image.extension if legacy_image.present?
  end

  def publishable
    old_published_at = channel.published_at
    channel.published_at = published_at
    errors.add(:channel, "is not ready to be published") unless channel.valid?
    channel.published_at = old_published_at
  end

  def publish
    channel.update(published_at: published_at) unless channel.published_before?(published_at)
  end

  def publishing?
    published_at.present?
  end

  def to_param
    uid
  end

  private

  def audio_ready!
    errors.add(:audio, :blank) if current_audio.blank?
  end

  def base_url
    return "https://www.ultrasoundgel.org" if Rails.env.development?

    Rails.application.routes.url_helpers.root_url.chomp("/")
  end

  def channel_check
    errors.add(:channel, "cannot be changed if publishing") if publishing?
  end

  def description_ready!
    errors.add(:description, :blank) if current_description.blank?
  end

  def image_ready!
    errors.add(:image, :blank) if current_image.blank?
  end

  def set_uid
    self.uid = SecureRandom.urlsafe_base64
    set_uid if self.class.where(uid: uid).exists?
  end

  def unpublished!
    errors.add(:episode, "is already publishing") if publishing?
    throw :abort if errors.any?
  end

  def unpublishable
    errors.add(:published_at, "cannot be changed if published") if published?
  end

  def update_podbean
    params = {
      content: current_description_html,
      status: published? ? "publish" : "draft",
      title: title,
      type: "public"
    }

    if audio.blob&.saved_changes? && current_audio
      params[:remote_media_url] = "#{base_url}/file/redirect/#{audio.filename}?url=#{CGI::escape(current_audio)}"
    end

    if image.blob&.saved_changes? && current_image
      params[:remote_logo_url] = "#{base_url}/file/redirect/#{image.filename}?url=#{CGI::escape(current_image)}"
    end

    params[:episode_number] = number if number
    response = Podbean.update_episode(podbean_id, params) if podbean_id
    response ||= Podbean.create_episode(params)

    if response["error_description"].present?
      errors.add(:base, response["error_description"])

      raise(ActiveRecord::RecordInvalid, self)
    end

    update_columns(podbean_id: response["episode"]["id"]) unless podbean_id
  end
end
