credentials = Aws::Credentials.new(
  Rails.application.credentials.aws[:access_key],
  Rails.application.credentials.aws[:secret_key]
)

Aws.config.update({
  region: "us-east-1",
  credentials: credentials
})
