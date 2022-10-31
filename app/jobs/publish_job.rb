class PublishJob < ApplicationJob
  def perform
    Episode.published.ascending.where(podbean_published_at: nil).each do |episode|
      episode.number ||= (Episode.maximum(:number) || 0) + 1 if episode.full?
      episode.podbean_published_at = DateTime.now
      episode.save
    end

    Post.published.ascending.where(notified_at: nil).each do |post|
      post.update(notified_at: DateTime.now)

      User.where(post_notifications: true).find_each do |user|
        PostMailer.publish_email(user, post).deliver_later

        user.comment_notifications.find_or_create_by(comment_notificationable: post) if user.admin
      end
    end
  end
end
