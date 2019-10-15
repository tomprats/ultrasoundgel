namespace :rails do
  desc "Remote console"
  task :console do
    command = "RAILS_ENV=#{fetch(:rails_env)} #{rails} console"
    server = roles(:app)[0]
    exec <<-CMD
      ssh #{server.user}@#{server.hostname} -t "cd #{fetch(:deploy_to)}/current && #{command}"
    CMD
  end
end

def rails
  SSHKit::Command.new(:bundle, :exec, :rails).to_command
end
