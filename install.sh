#!/bin/bash

# Any installation related commands
sudo apt-get update
sudo apt-get install -y postgresql postgresql-contrib
curl -sL https://deb.nodesource.com/setup_15.x | sudo -E bash -
sudo apt-get install -y nodejs
# Any configuration related commands
sudo -u postgres psql -U postgres -d postgres -c "ALTER USER postgres PASSWORD 'postgres';"
sudo -u postgres psql -U postgres -d postgres -f ./backend/db/database.sql
