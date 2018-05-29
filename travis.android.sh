#!/bin/bash
if [[ $TRAVIS_COMMIT_MESSAGE == *"[skip android]"* ]]
then
	echo "Skipping android stage"
else
	source travis.env.sh
	export ORG_GRADLE_PROJECT_cdvVersionCode=$TRAVIS_BUILD_NUMBER
	npm run cordova:supply:android
fi
