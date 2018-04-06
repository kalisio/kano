#!/bin/bash
# Required to avoid local build of the image
docker-compose pull aktnmap
docker-compose -f docker-compose.yml -f docker-compose.deploy.yml up -d
