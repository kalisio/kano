#!/bin/bash
# Required to avoid local build of the image
set -a
. ./.env
set +a

if [ "$FLAVOR" = "dev" ]; then
  docker stack deploy -c app.yml -c app.swarm.yml -c mongodb.yml -c mongodb.swarm.yml $APP
else
  docker stack deploy -c app.yml -c app.swarm.yml $APP
fi
