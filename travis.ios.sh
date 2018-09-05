#!/bin/bash
if [[ $TRAVIS_COMMIT_MESSAGE == *"[skip ios]"* ]]
then
	echo "Skipping ios stage"
else
  # Retrieve the built app
	aws s3 sync s3://kapp-builds/$TRAVIS_BUILD_NUMBER/dist cordova/www
	# Retrieve the secret files
	echo -e "machine github.com\n  login $GITHUB_TOKEN" > ~/.netrc
	git clone https://github.com/kalisio/kApp-secrets
	# Install the required secret files
	cp kApp-secrets/cordova/* cordova/.
	# Generate the fastlane Appfile
	cd cordova/fastlane
	bash android.sh
	cd ../..
	# Build and deploy the app
	npm config set loglevel warn
	npm run cordova:add:android 
	npm run cordova:build 
	npm run cordova:fastlane
fi
