#!/bin/bash
docker pull kalisio/kapp
chmod u+x kApp.env.sh
source kApp.env.sh
docker-compose -f docker-compose.yml -f docker-compose.deploy.yml up -d
