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
	cp kApp-secrets/cordova/build.json cordova/.
	# Generate the fastlane Appfile
	mkdir -p ~/Library/MobileDevice/Provisioning\ Profiles
	cp kApp-secrets/cordova/*.mobileprovision ~/Library/MobileDevice/Provisioning\ Profiles/.
	# Build and deploy the app
	npm run cordova:deploy:ios
fi
