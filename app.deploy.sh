#!/bin/bash
chmod u+x app.env.sh
source app.env.sh
# Required to avoid local build of the image
docker pull kalisio/aktnmap:${FLAVOR}
docker-compose -f docker-compose.yml -f docker-compose.deploy.yml up -d
