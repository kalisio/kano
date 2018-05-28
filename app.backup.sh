#!/bin/bash
export TIMESTAMP=$(date +'%Y%m%d-%H%M%S')

docker exec -t mongodb-kapp mkdir -p /dumps
docker exec -t mongodb-kapp mongodump --gzip --archive=/dumps/kapp-${TIMESTAMP}.gz
mkdir -p ./dumps
docker cp mongodb-kapp:/dumps/kapp-${TIMESTAMP}.gz ./dumps/kapp-${TIMESTAMP}.gz
