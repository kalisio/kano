#!/bin/bash
# Required to avoid local build of the image
set -a
. ./.env
set +a

docker-compose pull app
docker stack deploy -c docker-compose.yml -c docker-compose.swarm.yml ${APP}