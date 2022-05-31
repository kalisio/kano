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

yarn build
EXIT_CODE=$? 
tail -n 24 build.log
check_code $EXIT_CODE "Builing the client"

# Log in to docker before building the app because of rate limiting
docker login -u="$DOCKER_USER" -p="$DOCKER_PASSWORD"
check_code $? "Connecting to Docker"

# Create an archive to speed docker build process  and build the image
cd ../..
tar --exclude='kalisio/kano/test' -zcf kalisio.tgz kalisio
docker build --build-arg APP=$APP --build-arg FLAVOR=$FLAVOR --build-arg BUILD_NUMBER=$BUILD_NUMBER -f dockerfile -t kalisio/$APP:$TAG . 
check_code $? "Building the app docker image"

travis_fold end "build"

#
# Deploy the app
#
travis_fold start "deploy"

# Push the app image to the hub
push_docker $APP $TAG $FLAVOR 

travis_fold end "deploy"
