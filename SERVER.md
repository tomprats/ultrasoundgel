# PROBLEM

- vim /etc/systemd/system/unicorn_ultrasoundgel_production.service
- source command not working to load asdf
- Figure out alternative way to load bunder from asdf ruby


Environment=ASDF_DATA_DIR=/opt/asdf
Environment=ASDF_DIR=/opt/asdf

ExecStart=/opt/asdf/bin/asdf exec bundle exec unicorn -D -c /var/www/ultrasoundgel/shared/config/unicorn.rb -E production












# Commands

```
me@localhost:~# cap production setup
me@localhost:~# cap production deploy
```

# New Servers

```
root@server:~# sudo update-alternatives --config editor
root@server:~# git config --global user.name Tomify
root@server:~# git config --global user.email tprats108@gmail.com
root@server:~# ssh-keygen -t rsa -b 4096 -C "tprats108@gmail.com"
```

## Vim

```
root@server:~# cat ~/.ssh/id_rsa.pub # Add to https://github.com/tomprats/dotfiles/settings/keys/new
root@server:~# git clone git@github.com:tomprats/dotfiles.git ~/dotfiles
root@server:~# cd ~/
root@server:~# ln -s ~/dotfiles/.vimrc
root@server:~# ln -s ~/dotfiles/.vimrc.bundles
root@server:~# git clone git@github.com:VundleVim/Vundle.vim.git ~/.vim/bundle/Vundle.vim
root@server:~# vim +PluginInstall +qall # Ignore error about color scheme
```

## Add Swap

```
root@server:~# sudo fallocate -l 1G /swapfile
root@server:~# sudo chmod 600 /swapfile
root@server:~# sudo mkswap /swapfile
root@server:~# sudo swapon /swapfile
root@server:~# sudo swapon -s
root@server:~# vim /etc/fstab
```

Append `/swapfile   none    swap    sw    0   0`

```
root@server:~# sudo vim /etc/sysctl.conf
```

Prepend

```
vm.swappiness = 10
vm.vfs_cache_pressure = 50
```

## Install Dependencies

### General

```
root@server:~# apt install -y python3-pip
root@server:~# apt-get install imagemagick # if using carrierwave processing
```

### ASDF

Needs to be updated to install in /opt/asdf
- Add ENV variables to each user's .bashrc
- Probably allow ownership of /opt/asdf to each user

```
root@server:~# git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.11.3
root@server:~# vim ~/.bashrc
```

Prepend

```
. "$HOME/.asdf/asdf.sh"
```

### Nginx

If Nginx is missing, install it

sudo apt install -y nginx

### Node

```
root@server:~# asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git
root@server:~# asdf install nodejs 20.3.0
```

### Postgres

#### Without ASDF

```
root@server:~# sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
root@server:~# apt update
root@server:~# apt install -y postgresql-13 postgresql-contrib libpq-dev
root@server:~# vim /etc/postgresql/13/main/pg_hba.conf
```

- Change `local all all peer` to `local all all md5`
- Add `local all deploy peer` under the postgres record

```
root@server:~# pg_ctlcluster 13 main start
root@server:~# vim /etc/postgresql/14/main/start.conf # Change auto to manual if present
root@server:~# vim /etc/postgresql/13/main/start.conf # If 14 was present, change port to 5432
root@server:~# systemctl daemon-reload
```

#### With ASDF (incomplete)

```
root@server:~# apt-get install -y linux-headers-$(uname -r) build-essential libssl-dev libreadline-dev zlib1g-dev libcurl4-openssl-dev uuid-dev icu-devtools
root@server:~# asdf plugin-add postgres
root@server:~# POSTGRES_SKIP_INITDB=true asdf install postgres 13.4
root@server:~# useradd -U -d /root/.asdf/installs/postgres postgres
root@server:~# sudo chown -R postgres: ~postgres
root@server:~# sudo chmod o+x /root/.asdf/installs
root@server:~# sudo chmod o+x /root/.asdf
root@server:~# sudo chmod o+x /root
root@server:~# su postgres -c "~postgres/13.4/bin/initdb -D ~postgres/13.4/data -U postgres"
root@server:~# vim ~postgres/13.4/data/pg_hba.conf
```

Change `trust` or `peer` to `md5`, but know I'm kind of winging it
Add `local all postgres peer` above the regular chart
Add `local all deploy peer` above the regular chart

### Redis

```
root@server:~# apt install -y redis-server
root@server:~# chown redis:redis /var/lib/redis
root@server:~# vim /etc/redis/redis.conf # Uncomment `supervised auto`
root@server:~# systemctl restart redis.service
```

Now to start a second server we follow along from https://gist.github.com/Paprikas/ef55f5b2401c4beec75f021590de6a67

```
root@server:~# install -o redis -g redis -d /var/lib/redis2
root@server:~# cp -p /etc/redis/redis.conf /etc/redis/redis2.conf
root@server:~# vim /etc/redis/redis2.conf
```

Update to use the following:

```
pidfile /var/run/redis2/redis-server2.pid
logfile /var/log/redis/redis-server2.log
dir /var/lib/redis2
port 6380
```

```
root@server:~# cp /lib/systemd/system/redis-server.service /lib/systemd/system/redis-server2.service
root@server:~# vim /lib/systemd/system/redis-server2.service
```

Some of this may be different, just search redis and replace it with redis2 maybe

```
ExecStart=/usr/bin/redis-server /etc/redis/redis2.conf
PIDFile=/var/run/redis/redis-server2.pid
RuntimeDirectory=redis2
ReadWriteDireRuntimeDirectory=redis2
ReadWriteDirectories=-/var/run/redis2
Alias=redis2.service
```

```
root@server:~# systemctl enable redis-server2.service
root@server:~# systemctl start redis-server2.service
root@server:~# ps aux | grep redis # Hopefully see 2 redis with different ports
```

### Ruby

```
root@server:~# asdf plugin add ruby https://github.com/asdf-vm/asdf-ruby.git
root@server:~# apt-get install -y libssl-dev
root@server:~# asdf install ruby 2.7.1
```

If the ruby install errors, try running one of these commands and then retrying the install

```
root@server:~# apt-get install autoconf patch build-essential rustc libssl-dev libyaml-dev libreadline6-dev zlib1g-dev libgmp-dev libncurses5-dev libffi-dev libgdbm6 libgdbm-dev libdb-dev uuid-dev
root@server:~# apt install -y ruby
```

## Create Deploy User

```
root@server:~# adduser --disabled-password --gecos "" deploy
root@server:~# usermod -a -G sudo deploy
root@server:~# mkdir /var/www
root@server:~# sudo chown deploy:deploy /var/www/

root@server:~# su - postgres
postgres@server:~# createuser -s deploy

```

### Setup Authentication

```
root@server:~# su - deploy
deploy@server:~# mkdir -p ~/.ssh
deploy@server:~# ssh-keygen -t rsa -b 4096 -C "tprats108@gmail.com"
deploy@server:~# vim ~/.ssh/authorized_keys
```

Add local ssh key from https://github.com/tomprats.keys

```
root@server:~# visudo

# Add to bottom
deploy ALL=(ALL) NOPASSWD: ALL # because unicorn-nginx requires mv command
```

--------------------------------------------------------------------------------------------------------------------
################################################# Currently Here ###################################################
--------------------------------------------------------------------------------------------------------------------
# Doing this
--------------------------------------------------------------------------------------------------------------------

### Test Authentication

```
me@localhost:~# ssh deploy@server "hostname; uptime"
```

## Setup Backups

### Setup AWS

```
root@server:~# pip install awscli
root@server:~# aws configure # with newly created credentials
```

### Configure

```
root@server:~# mkdir /opt/tomify
root@server:~# cd /opt/tomify
root@server:~# git clone git@github.com:tomprats/backup.git
root@server:~# cp backup/config.sh.example backup/config.sh
root@server:~# vim backup/config.sh
```

May need to fix git with new keys

```
root@server:~# ssh-keygen -t rsa -b 4096 -C "tprats108@gmail.com"
root@server:~# cat ~/.ssh/backup_rsa.pub # Add to https://github.com/tomprats/backup/settings/keys
root@server:~# eval "$(ssh-agent)"
root@server:~# ssh-add ~/.ssh/backup_rsa
```

### Cron

```
root@server:~# crontab -e

30 2 * * 5 /opt/tomify/backup/backup.sh >> /var/log/tomify-backup.log
```

## Setup Lets Encrypt

https://certbot.eff.org

### Install

```
root@server:~# snap install --classic certbot
root@server:~# ln -s /snap/bin/certbot /usr/bin/certbot
root@server:~# certbot --nginx
root@server:~# mkdir -p /etc/nginx/ssl
root@server:~# openssl dhparam -out /etc/nginx/ssl/dhparam.pem 2048
```

View logs in /var/log/letsencrypt/letsencrypt.log


## Monitoring

### Root Emails

Maybe try https://autoize.com/email-notifications-for-cron-jobs-postfix-centos-7/

# New Apps

## Authentication

Add remote ssh key from deploy user to private project's github

```
deploy@server:~# ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts
deploy@server:~# cat ~/.ssh/id_rsa.pub
```

Then add it to https://github.com/tomprats/example/settings/keys

### Test Authentication

```
me@localhost:~# ssh -A deploy@server "git ls-remote git@example.github.com:tomprats/example.git"
```

### Troubleshooting Authentication

If that doesn't work, may need to create a new key with a different name (example_rsa)

```
deploy@server:~# ssh-keygen -t rsa -b 4096 -C "tprats108@gmail.com"
deploy@server:~# vim ~/.ssh/config # Add new IdentityFile entry for key

Host github.com
HostName github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa
IdentityFile ~/.ssh/example_rsa
```

## Setup Deploy Directory

```
me@localhost:~# ssh root@server
root@server:~# deploy_to=/var/www/{project}
root@server:~# mkdir -p ${deploy_to}
root@server:~# chown deploy:deploy ${deploy_to}
root@server:~# umask 0002
root@server:~# chmod g+s ${deploy_to}
root@server:~# mkdir ${deploy_to}/{releases,shared}
root@server:~# chown deploy ${deploy_to}/{releases,shared}
root@server:~# npm install -g yarn # if yarn is used
```

- If special @tomprats/fontawesome packages are used, add /home/deploy/.npmrc with a new github token for packages

- If node-sass causes issues, it may require manual installation with

```
root@server:~# sudo npm install --unsafe-perm -g node-sass
```

http://capistranorb.com/documentation/getting-started/authentication-and-authorisation/

## Setup and Deploy

- Remove references to ssl in deploy.rb
- Ensure config/secrets.yml is in .gitignore but present (`git rm --cached config/secrets.yml`)
- Ensure config/secrets.yml has production secret (run `rails secret`)

If using a newer version of rails with credentials

- Copy the master key to the server

```
me@localhost:~# scp config/master.key root@server:/var/www/example/shared/config/master.key
root@server:~# chown deploy:deploy /var/www/example/shared/config/master.key
```

- Add `append :linked_files, "config/master.key"` to config/deploy.rb
- Remove `require "capistrano/secrets_yml"` from the Capfile
- Remove `gem "capistrano-secrets-yml"` from the Gemfile and `bundle install`

Then continue deploying

```
me@localhost:~# cap production setup
me@localhost:~# cap production sidekiq:install # if sidekiq is used
me@localhost:~# cap production logrotate:config
me@localhost:~# cap production deploy
```

## Unicorn

Enable the service so it comes back online after restarts

```
root@server:~# sudo systemctl enable unicorn_example_production.service
```

## Lets Encrypt

```
root@server:~# sudo certbot --authenticator webroot -w /var/www/{example}/current/public --installer nginx
```

- Add references to nginx back to config/deploy.rb

```
me@localhost:~# cap production setup
me@localhost:~# cap production deploy
```

## Database

### Exporting from previous server

```
root@old:~# sudo -u postgres psql # Open postgres console for old db name
postgres=# \l # List databases
root@old:~# PGPASSWORD=dbpassword pg_dump -Fc --no-acl --no-owner -h localhost -U deploy old_production > latest.dump
me@localhost:~# scp root@old:/root/latest.dump ./
```

### Importing from previous server

```
me@localhost:~# scp latest.dump root@server:/
root@server:~# PGPASSWORD=dbpassword pg_restore --verbose --clean --no-acl --no-owner -h localhost -d example_production latest.dump -U example_production
```

### Importing from current backup

```
me@localhost:~# scp example_production.sql.gz root@server:/
root@server:~# su - postgres
postgres@server:~# createdb example_production
postgres@server:~# gunzip < /example_production.sql.gz | psql example_production
```

# Other Related Tasks

## Error with DB

> PG::InsufficientPrivilege: ERROR:  permission denied for table schema_migration

May need to follow instructions from https://awsbytes.com/postgresql-change-owner-of-all-tables-within-a-schema/

- `\dt` to verify owner is incorrect and to get schema (public in this example)
- Run this to get the necessary queries to run. Copy and past them all

`SELECT 'ALTER TABLE '||t.schemaname||'.'||t.tablename ||' owner TO example_production;' FROM pg_tables t WHERE schemaname='public';`
