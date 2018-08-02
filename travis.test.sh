#!/bin/bash
# Output directory for server coverage
mkdir server-coverage
chmod -R 777 server-coverage
# Output directory for client screenshots
mkdir client-screenshots
chmod -R 777 client-screenshots

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
fi
