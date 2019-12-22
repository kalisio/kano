#!/bin/bash
source .travis.env.sh

# Create the required network 
docker network create --attachable $DOCKER_NETWORK

# Build the image
docker-compose -f deploy/app.yml -f deploy/app.build.yml build
ERROR_CODE=$?
if [ $ERROR_CODE -ne 0 ]; then
	echo "Building the docker image has failed [error: $ERROR_CODE]"
	exit 1
fi

# Tag the built image and push it to the hub
docker tag kalisio/$APP kalisio/$APP:$VERSION_TAG
docker login -u="$DOCKER_USER" -p="$DOCKER_PASSWORD"
docker push kalisio/$APP:$VERSION_TAG
ERROR_CODE=$?
if [ $ERROR_CODE -eq 1 ]; then
	echo "Pushing the docker image has failed [error: $ERROR_CODE]"
	exit 1
fi

