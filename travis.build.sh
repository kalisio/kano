#!/bin/bash
source travis.env.sh

if [[ $TRAVIS_COMMIT_MESSAGE == *"[skip build]"* ]]
then
	echo "Skipping build stage"
	# We simply pull existing version instead of really build it
	# Indeed we cannot really skip the build otherwise the deploy step will fail due to missing artefacts
	docker pull kalisio/$APP:$VERSION_TAG
fi

cd deploy
docker-compose -f app.yml -f app.build up -d
docker cp $APP:/opt/$APP/dist dist
docker login -u="$DOCKER_USER" -p="$DOCKER_PASSWORD"
docker tag kalisio/$APP kalisio/$APP:$VERSION_TAG
docker push kalisio/$APP:$VERSION_TAG
