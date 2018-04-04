#!/bin/bash
if [[ $TRAVIS_BRANCH == "master" ]]
then
	echo FLAVOR=dev > .env
	echo DOMAIN=https://kapp.dev.kalisio.xyz >> .env
fi
if [[ $TRAVIS_BRANCH == "test" ]]
then
	if [[ -z "$TRAVIS_TAG" ]]
	then
		echo FLAVOR=test > .env
		echo DOMAIN=https://kapp.test.kalisio.xyz >> .env
	else
		echo FLAVOR=prod > .env
		echo DOMAIN=https://kapp.kalisio.xyz >> .env
	fi
fi
