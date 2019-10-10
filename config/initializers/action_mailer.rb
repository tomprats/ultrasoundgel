if Rails.env.development?
  Rails.application.config.action_mailer.preview_path = "#{Rails.root}/lib/previews"
else
  Rails.application.config.action_mailer.smtp_settings = {
    address: "email-smtp.us-east-1.amazonaws.com",
    port: "587",
    domain: "tomify.me",
    user_name: Rails.application.credentials.smtp[:username],
    password: Rails.application.credentials.smtp[:password],
    authentication: "plain",
    enable_starttls_auto: true
  }
end
