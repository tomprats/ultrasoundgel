class UnpublishJob < ApplicationJob
  def perform(title = nil)
    User.where(post_notifications: true).find_each do |user|
      PostMailer.unpublish_email(user, title).deliver_later
    end
  end
end
