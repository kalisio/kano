#!/bin/bash
# Install the kdk and the required dependencies according the project file

# Install the kdk
git clone https://github.com/kalisio/kdk.git && cd kdk && yarn 

# Clone the project and install the dependencies
cp ${TRAVIS_BUILD_DIR}/${PROJECT} ${APP}.js
node . ${APP}.js --clone ${TRAVIS_BRANCH}
node . ${APP}.js --install
node . ${APP}.js --link

cd $APP