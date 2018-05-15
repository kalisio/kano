#!/bin/bash
if [[ $TRAVIS_COMMIT_MESSAGE == *"[skip ios]"* ]]
then
	echo "Skipping ios stage"
else
	source env.travis.sh
	npm run cordova:supply:ios
fi
