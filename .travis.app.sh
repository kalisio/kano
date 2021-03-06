#!/bin/bash

push_docker () {
	docker push kalisio/$1:$2
	check_code $? "Pushing the $2 $1 docker image"
	docker tag kalisio/$1:$2 kalisio/$1:$3
	docker push kalisio/$1:$3
	check_code $? "Pushing the $3 $1 docker image"
}

#
# Provision the required files
#
travis_fold start "provision"

source .travis.env.sh

travis_fold end "provision"

#
# Build the app
#
travis_fold start "build"

# Build the api
cd api && yarn build
check_code $? "Building the api"

# Build the client
cd .. && yarn build ##> build.log 2>&1
EXIT_CODE=$? 
tail -n 24 build.log
check_code $EXIT_CODE "Builing the client"

docker login -u="$DOCKER_USER" -p="$DOCKER_PASSWORD"
check_code $? "Connecting to Docker"

# Create an archive to speed docker build process
cd ../..
tar --exclude='kalisio/kano/test' -zcf kalisio.tgz kalisio
docker build --build-arg APP=$APP --build-arg FLAVOR=$FLAVOR --build-arg BUILD_NUMBER=$BUILD_NUMBER -f dockerfile -t kalisio/$APP:$TAG . 
check_code $? "Building the app docker image"

docker build --build-arg APP=$APP --build-arg TAG=$TAG -f dockerfile.api-tester -t kalisio/$APP:${TAG}_api-tester . 
check_code $? "Building the tests api docker image"

# client tests were disabled since testcafe doesn't work well
# docker build --build-arg APP=$APP -f dockerfile.client-tester -t kalisio/$APP:${TAG}_client-tester . 
# check_code $? "Building the tests client docker image"

travis_fold end "build"

#
# Deploy the app
#
travis_fold start "deploy"


# Push the app image to the hub
push_docker $APP $TAG $FLAVOR 

# Push the tests api image to the hub
push_docker $APP ${TAG}_api-tester ${FLAVOR}_api-tester

# Push the tests client image to the hub
# push_docker $APP ${TAG}_client-tester ${FLAVOR}_client-tester

travis_fold end "deploy"
