#!/bin/bash
export APP=kano
export HOST=kano
export PORT=8081
export DOMAIN=kalisio.xyz
export VERSION=$(node -p -e "require('./package.json').version")

if [[ $TRAVIS_BRANCH == "master" ]]
then
	export DEBUG=kalisio*,-kalisio:kCore:authorisations:hooks
	export FLAVOR=dev
	export SUBDOMAIN=dev.$DOMAIN
	export VERSION_TAG=$VERSION-dev
fi
if [[ $TRAVIS_BRANCH == "test" ]]
then
	export DEBUG=
	export FLAVOR=test
	export SUBDOMAIN=test.$DOMAIN
	export VERSION_TAG=$VERSION-test
fi
if [[ -n "$TRAVIS_TAG" ]]
then
	export DEBUG=
	export FLAVOR=prod
	export SUBDOMAIN=$DOMAIN
	export VERSION_TAG=$VERSION
fi

export BUILD_NUMBER=$TRAVIS_BUILD_NUMBER
export NODE_APP_INSTANCE=$FLAVOR

echo "APP=$APP" > .env
echo "COMPOSE_PROJECT_NAME=$APP" >> .env 
echo "DEBUG=$DEBUG" >> .env
echo "FLAVOR=$FLAVOR" >> .env
echo "NODE_APP_INSTANCE=$FLAVOR" >> .env
echo "VERSION=$VERSION" >> .env
echo "VERSION_TAG=$VERSION_TAG" >> .env
echo "DOMAIN=$DOMAIN" >> .env
echo "SUBDOMAIN=$SUBDOMAIN" >> .env
echo "HOST"=$HOST >> .env
echo "PORT=$PORT" >> .env
echo "DOCKER_NETWORK=$DOCKER_NETWORK" >> .env
echo "BUILD_NUMBER=$TRAVIS_BUILD_NUMBER" >> .env
echo "APP_SECRET=$APP_SECRET" >> .env
echo "DB_URL=$DB_URL" >> .env