#!/bin/bash
if [[ $TRAVIS_COMMIT_MESSAGE == *"[skip test]"* ]]
then
	echo "Skipping test stage"
else
	source env.travis.sh
	docker pull kalisio/kapp
	docker-compose -f docker-compose.yml up -d mongodb-kapp
	docker-compose -f docker-compose.yml -f docker-compose.server-tests.yml up kapp
	docker-compose -f docker-compose.yml -f docker-compose.client-tests.yml up -d kapp
	docker-compose -f docker-compose.yml -f docker-compose.client-tests.yml up testcafe
fi

