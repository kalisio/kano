#!/bin/bash
chmod u+x kApp.env.sh
source kApp.env.sh
# Required to avoid local build of the image
docker pull kalisio/kapp:${FLAVOR}
docker-compose -f docker-compose.yml -f docker-compose.deploy.yml up -d
