#!/bin/bash

#
# Provision the required files
#
travis_fold start "provision"

source .travis.env.sh

# Install the required secret files requied to sign the app
cp $TRAVIS_BUILD_DIR/workspace/common/android/*.json src-cordova/
cp $TRAVIS_BUILD_DIR/workspace/$FLAVOR/android/*.json src-cordova/
cp $TRAVIS_BUILD_DIR/workspace/common/android/$GOOGLE_KEYSTORE src-cordova/	

travis_fold end "provision"

#
# Build the app
#
travis_fold start "build"

# Overwrite the title in dev/test flavor
if [ $FLAVOR != "prod" ]
then
	TITLE=$TITLE-$FLAVOR
fi

# Build and deploy the mobile app	
npm run cordova:build:android > android.build.log 2>&1
EXIT_CODE=$?
# Copy the log whatever the result
aws s3 cp android.build.log s3://${BUILD_BUCKET}/android.build.log
if [ $EXIT_CODE -ne 0 ]; then
	echo "Building the app failed [error: $EXIT_CODE]"
	exit 1
fi

# Backup the android build to S3
aws s3 sync src-cordova/platforms/android/app/build/outputs/apk s3://${BUILD_BUCKET}/android > /dev/null
EXIT_CODE=$?
if [ $EXIT_CODE -eq 1 ]; then
	echo "Copying the artefact to s3 failed [error: $EXIT_CODE]"
	exit 1
fi

travis_fold end "build"

#
# Deploy the app
#
travis_fold start "deploy"

# Generate the Appfile
echo "json_key_file(\"google-play.json\")" > src-cordova/fastlane/Appfile
echo "package_name(\"$PACKAGE_ID\")" >> src-cordova/fastlane/Appfile

# Deploy the APK to GooglePlay
cd src-cordova
fastlane android $NODE_APP_INSTANCE > android.deploy.log 2>&1
EXIT_CODE=$?
# Copy the log whatever the result
aws s3 cp android.deploy.log s3://${BUILD_BUCKET}/android.deploy.log
if [ $EXIT_CODE -ne 0 ]; then
	echo "Deploying the app failed [error: $EXIT_CODE]"
	exit 1
fi

travis_fold end "deploy"

