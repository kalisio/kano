#!/bin/bash
if [[ $TRAVIS_COMMIT_MESSAGE == *"[skip test]"* ]]
then
	echo "Skipping test stage"
else
	source travis.env.sh
	# Required to avoid local build of the image
	cd deploy
	docker pull kalisio/kapp:${FLAVOR}
	docker-compose -f docker-compose.yml up -d mongodb-kapp
	docker-compose -f docker-compose.yml -f docker-compose.server-tests.yml up kapp
	docker-compose -f docker-compose.yml -f docker-compose.client-tests.yml up -d kapp
	docker-compose -f docker-compose.yml -f docker-compose.client-tests.yml up testcafe
	cd ..
	codeclimate-test-reporter < server-coverage/lcov.info
fi
