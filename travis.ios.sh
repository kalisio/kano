#!/bin/bash
if [[ $TRAVIS_COMMIT_MESSAGE == *"[skip ios]"* ]]
then
	echo "Skipping ios stage"
else
	source travis.env.sh

  # Retrieve the built Web app
	aws s3 sync s3://kapp-builds/$TRAVIS_BUILD_NUMBER/dist cordova/www

	# Retrieve the secret files
	echo -e "machine github.com\n  login $GITHUB_TOKEN" > ~/.netrc
	git clone https://github.com/kalisio/kApp-secrets

	# Create the keychain
	KEY_CHAIN=ios-build.keychain
	KEY_CHAIN_PASSWORD=travis

	# Create a custom keychain
	security create-keychain -p $KEY_CHAIN_PASSWORD $KEY_CHAIN
	security unlock-keychain -p $KEY_CHAIN_PASSWORD $KEY_CHAIN
  security -v set-keychain-settings -lut 86400 $KEY_CHAIN
	security default-keychain -s $KEY_CHAIN

	# Add certificates to keychain and allow codesign to access them
	security import kApp-secrets/ios/AppleWWDRCA.cer -k $KEY_CHAIN -T /usr/bin/codesign
	security import kApp-secrets/ios/ios_development.cer -k $KEY_CHAIN -T /usr/bin/codesign
	security import kApp-secrets/ios/ios_distribution.cer -k $KEY_CHAIN -T /usr/bin/codesign
	security import kApp-secrets/ios/ios_distribution.p12 -k $KEY_CHAIN -P $APPLE_KEY_PASSWORD -T /usr/bin/codesign

	# Install the required secret files requied to sign the app
	cp kApp-secrets/ios/build.json cordova/.
	mkdir -p ~/Library/MobileDevice/Provisioning\ Profiles
	cp kApp-secrets/ios/*.mobileprovision ~/Library/MobileDevice/Provisioning\ Profiles/.

	# Build and deploy the app
	npm run cordova:add:ios
	rpm run cordova::build:release

  # Backup the ios build to S3
	aws s3 sync cordova/platforms/ios/build s3://kapp-builds/$TRAVIS_BUILD_NUMBER/ios
fi
