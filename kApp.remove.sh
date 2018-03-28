#!/bin/bash
docker rmi $(docker images | grep "<none>" | awk '{print $3}')
docker-compose -f docker-compose.yml -f docker-compose.deploy.yml down



