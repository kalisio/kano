#!/bin/bash
docker rmi $(docker images | grep "<none>" | awk '{print $3}')
docker stack rm $APP
