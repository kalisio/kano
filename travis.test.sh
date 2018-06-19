#!/bin/bash
if [[ $TRAVIS_COMMIT_MESSAGE == *"[skip test]"* ]]
then
	echo "Skipping test stage"
else
	source travis.env.sh

	# It first need to create the required network 
	docker network create --attachable $DOCKER_NETWORK

  # Run the tests
	docker-compose -f deploy/app.yml -f deploy/mongodb.yml up -d mongodb
	docker-compose -f deploy/app.yml -f deploy/mongodb.yml -f deploy/app.test.server.yml up app
	docker-compose -f deploy/app.yml -f deploy/mongodb.yml -f deploy/app.test.client.yml up -d app
	docker-compose -f deploy/app.yml -f deploy/mongodb.yml -f deploy/app.test.client.yml up testcafe

	# Report the test results
	codeclimate-test-reporter < deploy/server-coverage/lcov.info
fi
