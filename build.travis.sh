#!/bin/bash
source env.travis.sh

if [[ $TRAVIS_COMMIT_MESSAGE == *"[skip build]"* ]]
then
	echo "Skipping build stage"
	# We simply pull existing version instead of really build it
	# Indeed we cannot really skip the build otherwise the deploy step will fail due to missing artefacts
	docker pull kalisio/aktnmap:${VERSION_TAG}
fi

docker-compose -f docker-compose.yml up -d
docker cp aktnmap:/opt/aktnmap/dist dist
docker login -u="$DOCKER_USER" -p="$DOCKER_PASSWORD"
docker tag kalisio/aktnmap kalisio/aktnmap:${VERSION_TAG}
docker push kalisio/aktnmap:${VERSION_TAG}
