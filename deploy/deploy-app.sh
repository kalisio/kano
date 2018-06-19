#!/bin/bash
# Required to avoid local build of the image
set -a
. ./.env
set +a

if [ "$FLAVOR" = "dev" ]; then
  docker stack deploy -c app.yml -c app.swarm.yml -c app.mongodb.yml -c app.mongodb.swarm.yml $APP
else
  docker stack deploy -c app.yml -c app.swarm.yml -c $APP
fi
