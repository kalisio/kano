#!/bin/bash
export TIMESTAMP=$(date +'%Y%m%d-%H%M%S')

docker exec -t mongodb-aktnmap mkdir -p /dumps
docker exec -t mongodb-aktnmap mongodump --gzip --archive=/dumps/aktnmap-${TIMESTAMP}.gz
mkdir -p ./dumps
docker cp mongodb-aktnmap:/dumps/aktnmap-${TIMESTAMP}.gz ./dumps/aktnmap-${TIMESTAMP}.gz
