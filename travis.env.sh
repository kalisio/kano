#!/bin/bash
export VERSION=$(node -p -e "require('./package.json').version")
if [[ $TRAVIS_BRANCH == "master" ]]
then
	export DEBUG=kalisio*,-kalisio:kCore:authorisations:hooks
	export FLAVOR=dev
	export SUBDOMAIN=$APP.dev.$DOMAIN
	export VERSION_TAG=$VERSION-dev
fi
if [[ $TRAVIS_BRANCH == "test" ]]
then
	if [[ -z "$TRAVIS_TAG" ]]
	then
		export DEBUG=
		export FLAVOR=test
		export SUBDOMAIN=$APP.test.$DOMAIN
		export VERSION_TAG=$VERSION-test
	else
		export DEBUG=
		export FLAVOR=prod
		export SUBDOMAIN=$APP.$DOMAIN
		export VERSION_TAG=$VERSION
	fi
fi
export BUILD_NUMBER=$TRAVIS_BUILD_NUMBER
export NODE_APP_INSTANCE=$FLAVOR
# These ones are just for travis to SSH to the target machine
# Extract value from the right env variable according to flavor
SSH_USER_ENV_VAR_NAME=SSH_USER_$FLAVOR
export SSH_USER=${!SSH_USER_ENV_VAR_NAME}
SSH_REMOTE_ENV_VAR_NAME=SSH_REMOTE_$FLAVOR
export SSH_REMOTE=${!SSH_REMOTE_ENV_VAR_NAME}

echo "APP=$APP" > .env
echo "COMPOSE_PROJECT_NAME=$APP" >> .env 
echo "DEBUG=$DEBUG" >> .env
echo "FLAVOR=$FLAVOR" >> .env
echo "NODE_APP_INSTANCE=$FLAVOR" >> .env
echo "VERSION=$VERSION" >> .env
echo "VERSION_TAG=$VERSION_TAG" >> .env
echo "DOMAIN=$DOMAIN" >> .env
echo "SUBDOMAIN=$SUBDOMAIN" >> .env
echo "DOCKER_NETWORK=$DOCKER_NETWORK" >> .env
echo "PORT=$PORT" >> .env
echo "BUILD_NUMBER=$TRAVIS_BUILD_NUMBER" >> .env
echo "GOOGLE_MAIL_USER=$GOOGLE_MAIL_USER" >> .env
echo "GOOGLE_MAIL_PASSWORD=$GOOGLE_MAIL_PASSWORD" >> .env
echo "APP_SECRET=$APP_SECRET" >> .env
echo "SNS_ACCESS_KEY=$SNS_ACCESS_KEY" >> .env
echo "SNS_SECRET_ACCESS_KEY=$SNS_SECRET_ACCESS_KEY" >> .env
echo "SNS_ANDROID_ARN=$SNS_ANDROID_ARN" >> .env
echo "S3_ACCESS_KEY=$S3_ACCESS_KEY" >> .env
echo "S3_SECRET_ACCESS_KEY=$S3_SECRET_ACCESS_KEY" >> .env
echo "S3_BUCKET=$S3_BUCKET" >> .env
echo "GITHUB_CLIENT_ID=$GITHUB_CLIENT_ID" >> .env
echo "GITHUB_CLIENT_SECRET=$GITHUB_CLIENT_SECRET" >> .env
echo "GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID" >> .env
echo "GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET" >> .env
