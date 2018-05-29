#!/bin/bash
if [[ $TRAVIS_COMMIT_MESSAGE == *"[skip test]"* ]]
then
	echo "Skipping test stage"
else
	source travis.env.sh
	docker-compose -f deploy/app.yml up -d mongodb
	docker-compose -f deploy/app.yml -f deploy/app.server-tests.yml up app
	docker-compose -f deploy/app.yml -f deploy/app.client-tests.yml up -d app
	docker-compose -f deploy/app.yml -f deploy/app.client-tests.yml up testcafe
	codeclimate-test-reporter < server-coverage/lcov.info
fi
