#!/bin/bash
export APP=kapp
export HOST=kapp
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
# Fastlane environement
echo "APPLE_ID"=$APPLE_ID >> .env
echo "APPLE_TEAM_ID"=$APPLE_TEAM_ID >> .env
echo "APPLE_KEY_PASSWORD"=$APPLE_KEY_PASSWORD >> .env
echo "GITHUB_TOKEN"=$GITHUB_TOKEN >> .env
# Backend test environment
echo "GMAIL_API_USER=$GITHUB_PASSWORD" >> .env
echo "GMAIL_API_CLIENT_EMAIL=$GITHUB_PASSWORD" >> .env
echo "GMAIL_API_PRIVATE_KEY=$GITHUB_PASSWORD" >> .env
# Testcafe client test environment
echo "GOOGLE_USER=$GOOGLE_USER" >> .env
echo "GOOGLE_PASSWORD=$GOOGLE_PASSWORD" >> .env
echo "GITHUB_USER=$GITHUB_USER" >> .env
echo "GITHUB_PASSWORD=$GITHUB_PASSWORD" >> .env
echo "TESTCAFE_SPEED=$TESTCAFE_SPEED" >> .env
echo "DB_URL=$DB_URL" >> .env