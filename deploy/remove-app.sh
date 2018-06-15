#!/bin/bash
set -a
. ./.env
set +a

EXISTING_APP=`docker stack ls | grep $APP`
if [ "$EXISTING_APP" != "" ]; then
  docker stack rm $APP  
fi

