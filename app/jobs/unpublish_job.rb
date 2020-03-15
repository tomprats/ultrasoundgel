class UnpublishJob < ApplicationJob
  def perform
    User.where(post_notifications: true).find_each do |user|
      PostMailer.unpublish_email(user).deliver_later
    end
  end
end
