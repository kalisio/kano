#!/bin/bash
source travis.env.sh

# NOTE: The process build the image and run the container in order to allow us to copy the 
# built artifact from the container to the host. Indeed the artifact is then copied to S3 
# (see the deploy hook) and can be used by the following stages (i.e. Android and iOS).

# It first need to create the required network 
docker network create --attachable $DOCKER_NETWORK

if [[ $TRAVIS_COMMIT_MESSAGE == *"[skip build]"* ]]
then
	echo "Skipping build stage"
	# We simply pull existing version instead of really build it
	# Indeed we cannot really skip the build otherwise the deploy step will fail due to missing artefacts
	docker-compose -f deploy/app.yml up -d
else 
	# Build the image and run the container
	docker-compose -f deploy/app.yml -f deploy/app.build.yml up -d

	# Tag the built image and push it to the hub
	docker tag kalisio/$APP kalisio/$APP:$VERSION_TAG
	docker login -u="$DOCKER_USER" -p="$DOCKER_PASSWORD"
	docker push kalisio/$APP:$VERSION_TAG
fi

# Copy the artifact from the container to the host
# See https://docs.docker.com/compose/reference/envvars/#compose_project_name
# explanation on the container name
docker cp ${APP}_app_1:/opt/${APP}/dist dist



