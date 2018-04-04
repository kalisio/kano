#!/bin/bash
if [[ $TRAVIS_COMMIT_MESSAGE == *"[skip build]"* ]]
then
	echo "Skipping build stage"
else
	source env.travis.sh
	# If you'd like to simply pull existing version instead of really build it
	#- docker pull kalisio/kapp
	docker-compose -f docker-compose.yml up -d
	docker cp kapp:/opt/kapp/dist dist
	docker login -u="$DOCKER_USER" -p="$DOCKER_PASSWORD"
	docker tag kalisio/kapp kalisio/kapp:${FLAVOR}
	docker push kalisio/kapp:${FLAVOR}
fi
