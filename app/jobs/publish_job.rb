class PublishJob < ApplicationJob
  def perform
    Post.published.where(notified_at: nil).each do |post|
      post.episode.update(number: Episode.maximum(:number) + 1) unless post.episode.number
      post.update(notified_at: DateTime.now)

      User.where(post_notifications: true).find_each do |user|
        PostMailer.publish_email(user, post).deliver_later
      end
    end
  end
end
