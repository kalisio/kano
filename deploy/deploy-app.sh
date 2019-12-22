#!/bin/bash
# Required to avoid local build of the image
set -a
. ./.env
set +a

docker stack deploy -c deploy/app.yml -c deploy/app.swarm.yml $APP

