#!/bin/bash

check_code()
{
   if [ $1 -eq 1 ]; then
	  echo "$2 has failed [error: $1]"
	  exit 1
  fi
}

parse_semver()
{
  local REGEXP="^([0-9]+)\.([0-9]+)\.([0-9]+)"
  [[ "$1" =~ $REGEXP ]]
  SEMVER=(${BASH_REMATCH[1]} ${BASH_REMATCH[2]} ${BASH_REMATCH[3]})
}

# Extract the name of the app
APP=$(node -p -e "require('./package.json').name")

# Exports addtionnal variables
VERSION=$(node -p -e "require('./package.json').version")
parse_semver $VERSION
MAJOR=${SEMVER[0]}
MINOR=${SEMVER[1]}
PATCH=${SEMVER[2]}

echo "Building $APP v$MAJOR.$MINOR.$PATCH"

# Clone the workspace 
echo -e "machine github.com\n  login $GITHUB_TOKEN" > ~/.netrc
git clone -b $APP https://github.com/kalisio/kdk-workspaces workspace

# Define the flavor
TEST_FLAVOR_REGEX="^test-*|-test$"
PROD_FLAVOR_REGEX="^prod-v[0-9]+\.[0-9]+\.[0-9]+"
if [[ $TRAVIS_TAG =~ $PROD_FLAVOR_REGEX ]];
then
  export FLAVOR=prod
  KDK_PROJECT_FILE=$APP-$VERSION
else
  if [[ $TRAVIS_BRANCH =~ $TEST_FLAVOR_REGEX ]];
  then
    export FLAVOR=test
    KDK_PROJECT_FILE=$APP-$MAJOR.$MINOR
  else
    export FLAVOR=dev
    KDK_PROJECT_FILE=$APP
  fi
fi
export NODE_APP_INSTANCE=$FLAVOR
TAG=$VERSION-$FLAVOR

echo "Build flavor is $FLAVOR on branch $TRAVIS_BRANCH"

# Read ci environement variables
cp workspace/common/.travis.env .travis.env
if [ -f workspace/$FLAVOR/.travis.env ]
then
  echo merging $FLAVOR/.travis.env with common .travis.env
  cat workspace/$FLAVOR/.travis.env >> .travis.env
fi

set -a
. .travis.env
set +a

export BUILD_NUMBER=$TRAVIS_BUILD_NUMBER
BUILD_BUCKET=${APP}-builds/$BUILD_NUMBER

# Install the kdk
git clone https://github.com/kalisio/kli.git kalisio && cd kalisio && yarn 

# In dev flavor we can build different versions on different branches
# so check if a specific file exists for the target branch first otherwise use default one
if [[ -f $TRAVIS_BUILD_DIR/workspace/$FLAVOR/$KDK_PROJECT_FILE-$TRAVIS_BRANCH.js ]];
then
  cp $TRAVIS_BUILD_DIR/workspace/$FLAVOR/$KDK_PROJECT_FILE-$TRAVIS_BRANCH.js $APP.js
else
  cp $TRAVIS_BUILD_DIR/workspace/$FLAVOR/$KDK_PROJECT_FILE.js $APP.js
fi

# Clone the project and install the dependencies
node . $APP.js --clone
node . $APP.js --install
node . $APP.js --link

cd $APP

