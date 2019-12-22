#!/bin/bash
source .travis.env.sh

# It first need to create the required network and run mongodb
docker network create --attachable $DOCKER_NETWORK

if [ $1 == "api" ]
then 
	# Install code climate
	curl -L https://codeclimate.com/downloads/test-reporter/test-reporter-latest-linux-amd64 > ./cc-test-reporter
	chmod +x ./cc-test-reporter

	# Create the coverage dir
	mkdir coverage && chmod +w coverage

	# Initialize code climate
	./cc-test-reporter before-build

	# Run the tests
	docker-compose -f deploy/mongodb.yml -f deploy/app.yml -f deploy/app.test.api.yml up --exit-code-from app app
	ERROR_CODE=$?
	if [ $ERROR_CODE -ne 0 ]; then
		echo "Testing API failed [error: $ERROR_CODE]"
		exit 1
	fi

	# Pretend that the sources are in /opt/${APP}/api/src (symbolik link does not work)
	mkdir -p /opt/kdk/${APP}/api
	cp -R api/src /opt/kdk/${APP}/api/src

	# Report to code climate
	./cc-test-reporter after-build -t lcov --exit-code $ERROR_CODE
else
  # Extract the version of Testcafe to use
  export TESTCAFE_TAG=`node -p -e "require('./package.json').devDependencies['testcafe'].match(/\d+.\d+.\d+/g)[0]"`
  
	# Run Testcafe with the given fixture 
	export FIXTURE=$1

	# Create the screenshots dir
	mkdir screenshots
	chmod -R 777 screenshots

	# Run the tests
	echo Running tests $FIXTURE with Testcafe $TESTCAFE_TAG
	docker-compose -f deploy/mongodb.yml -f deploy/app.yml -f deploy/app.test.client.yml up --exit-code-from testcafe testcafe
	ERROR_CODE=$?
	#Copy the screenshots whatever the result
	aws s3 sync screenshots s3://$BUILDS_BUCKET/$BUILD_NUMBER/$FIXTURE-screenshots > /dev/null
	if [ $ERROR_CODE -ne 0 ]; then
		echo "Testing $FIXTURE failed [error: $ERROR_CODE]"
		exit 1
	fi
fi