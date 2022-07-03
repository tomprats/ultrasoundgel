class CommentMailer < ApplicationMailer
  def notification(user, record)
    @record_type = record.class.name.downcase
    @record_url = root_url + record.episode.number.to_s if record.class.name == "Post"
    # TODO: Case url, make sure it's a path
    # @record_url ||= case_url(record)
    @user = user

    mail(to: @user.email, subject: "Ultrasound GEL - Comment Notification - #{record.class.name}")
  end
end
