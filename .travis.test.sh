#!/bin/bash
source .travis.env.sh

# It first need to create the required network 
docker network create --attachable $DOCKER_NETWORK

#
# Test the api
#
#travis_fold start "api"

# Install code climate
curl -L https://codeclimate.com/downloads/test-reporter/test-reporter-latest-linux-amd64 > ./cc-test-reporter
chmod +x ./cc-test-reporter

# Create the coverage dir
mkdir coverage && chmod +w coverage

# Initialize code climate
./cc-test-reporter before-build

# Run the tests
docker-compose -f deploy/mongodb.yml -f deploy/app.yml -f deploy/app.test.server.yml up --exit-code-from app app
ERROR_CODE=$?
if [ $ERROR_CODE -ne 0 ]; then
	echo "Testing ${APP} API failed [error: $ERROR_CODE]"
	exit 1
fi

# Pretend that the sources are in /opt/${APP}/api/src (symbolik link does not work)
mkdir -p /opt/${APP}/api
cp -R api/src /opt/${APP}/api/src

# Report to code climate
./cc-test-reporter after-build -t lcov --exit-code $ERROR_CODE

#travis_fold end "api"

#
# Test the client
#
#travis_fold start "client"

# Output directory for client screenshots
#mkdir client-screenshots
#chmod -R 777 client-screenshots

# Run the app
#docker-compose -f deploy/mongodb.yml -f deploy/app.yml -f deploy/app.test.client.yml up testcafe
#ERROR_CODE=$?
# Backup the client screenshots
#aws s3 cp client-screenshots dist s3://$BUILDS_BUCKET/$BUILD_NUMBER/client-screenshots > /dev/null
#if [ $? -eq 1 ]; then
#	echo "Testing ${App} client failed [error: $ERROR_CODE]"
#	exit 1
#fi

#travis_fold end "client"

