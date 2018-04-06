#!/bin/bash
if [[ $TRAVIS_BRANCH == "master" ]]
then
	export DEBUG=kalisio*
	export FLAVOR=dev
	export DOMAIN=app.dev.aktnmap.xyz
fi
if [[ $TRAVIS_BRANCH == "test" ]]
then
	if [[ -z "$TRAVIS_TAG" ]]
	then
		export DEBUG=
		export FLAVOR=test
		export DOMAIN=app.test.aktnmap.xyz
	else
		export DEBUG=
		export FLAVOR=prod
		export DOMAIN=app.aktnmap.xyz
	fi
fi
export NODE_APP_INSTANCE=$FLAVOR

echo "DEBUG=$DEBUG" > .env
echo "FLAVOR=$FLAVOR" >> .env
echo "NODE_APP_INSTANCE=$FLAVOR" >> .env
echo "DOMAIN=$DOMAIN" >> .env
echo "GOOGLE_MAIL_USER=$GOOGLE_MAIL_USER" >> .env
echo "GOOGLE_MAIL_PASSWORD=$GOOGLE_MAIL_PASSWORD" >> .env
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
