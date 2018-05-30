#!/bin/bash
if [[ $TRAVIS_COMMIT_MESSAGE == *"[skip ios]"* ]]
then
	echo "Skipping ios stage"
else
	source travis.env.sh
	npm run cordova:supply:ios
fi
