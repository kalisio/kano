#!/bin/bash
# Required to avoid local build of the image
set -a
. ./.env
set +a

docker stack deploy -c app.yml -c app.swarm.yml $APP
