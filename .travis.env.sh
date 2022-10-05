#!/bin/bash

check_code()
{
   if [[ $1 -ne $2 ]]; then
	  echo "$3 has failed [error: $1]"
	  exit 1
  fi
}

parse_semver()
{
  local REGEXP="^([0-9]+)\.([0-9]+)\.([0-9]+)"
  [[ "$1" =~ $REGEXP ]]
  SEMVER=(${BASH_REMATCH[1]} ${BASH_REMATCH[2]} ${BASH_REMATCH[3]})
}

# Define the application name
APP=$(node -p -e "require('./package.json').name")

# Define the application version
VERSION=$(node -p -e "require('./package.json').version")
parse_semver $VERSION
MAJOR=${SEMVER[0]}
MINOR=${SEMVER[1]}
PATCH=${SEMVER[2]}

echo "Building $APP v$MAJOR.$MINOR.$PATCH"

# Define the flavor build
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

# Leave the project directory to avoid Webpack to look for files into the project directory
cd ..

# Clone the workspace where to build the app
echo -e "machine github.com\n  login $GITHUB_TOKEN" > ~/.netrc
git clone -b $APP https://github.com/kalisio/kdk-workspaces workspace
export WORKSPACE_DIR=`pwd`/workspace

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
BUILD_BUCKET=${APP}/$BUILD_NUMBER

# Install the kdk
git clone https://github.com/kalisio/kli.git kalisio && cd kalisio && yarn 

# In dev flavor we can build different versions on different branches
# so check if a specific file exists for the target branch first otherwise use default one
if [[ -f $WORKSPACE_DIR/$FLAVOR/$KDK_PROJECT_FILE-$TRAVIS_BRANCH.js ]];
then
  cp $WORKSPACE_DIR/$FLAVOR/$KDK_PROJECT_FILE-$TRAVIS_BRANCH.js $APP.js
else
  cp $WORKSPACE_DIR/$FLAVOR/$KDK_PROJECT_FILE.js $APP.js
fi

# Clone the project and install the dependencies
node . $APP.js --clone
node . $APP.js --install
node . $APP.js --link

cd $APP
