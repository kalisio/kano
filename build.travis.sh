#!/bin/bash
# If you'd like to simply pull existing version instead of really build it
#- docker pull kalisio/kapp
docker-compose -f docker-compose.yml up -d
docker cp kapp:/opt/kapp/dist dist
docker login -u="$DOCKER_USER" -p="$DOCKER_PASSWORD"
docker push kalisio/kapp
