#!/bin/bash
if [[ $TRAVIS_COMMIT_MESSAGE == *"[skip test]"* ]]
then
	echo "Skipping test stage"
else
	source .travis.env.sh

	# It first need to create the required network 
	docker network create --attachable $DOCKER_NETWORK

	#
	# Test the api
	#
	travis_fold start "api"

	# Output directory for server coverage
	mkdir server-coverage
	chmod -R 777 server-coverage

  # Run the tests
	docker-compose -f deploy/app.yml -f deploy/mongodb.yml up -d mongodb
	docker-compose -f deploy/app.yml -f deploy/mongodb.yml -f deploy/app.test.server.yml up app

  # Backup the server coverages
	codeclimate-test-reporter < server-coverage/lcov.info
	aws s3 cp server-coverage dist s3://$BUILDS_BUCKET/$BUILD_NUMBER/server-coverage > /dev/null
	if [ $? -eq 1 ]; then
		exit 1
	fi

  travis_fold end "api"

  #
	# Test the client
	#
  travis_fold start "client"

	# Output directory for client screenshots
	mkdir client-screenshots
	chmod -R 777 client-screenshots

	docker-compose -f deploy/app.yml -f deploy/mongodb.yml -f deploy/app.test.client.yml up -d app
	docker-compose -f deploy/app.yml -f deploy/mongodb.yml -f deploy/app.test.client.yml up testcafe
	
	# Backup the client screenshots
	aws s3 cp client-screenshots dist s3://$BUILDS_BUCKET/$BUILD_NUMBER/client-screenshots > /dev/null
	if [ $? -eq 1 ]; then
		exit 1
	fi

	travis_fold end "client"
fi
