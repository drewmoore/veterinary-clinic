#!/bin/sh
# Create a database and run migrations

set -eu

node ./bin/create-db.js
npm run db:migrate
