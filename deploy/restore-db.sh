#!/bin/bash
USAGE_MESSAGE="Usage: $0 [-h] [-d dbArchive]
 -h help
 -d {dbArchive} to use"

while getopts hd: args
do case "$args" in
  d) BACKUP_ARCHIVE="$OPTARG";;
  h) echo "${USAGE_MESSAGE}"
     exit 1;;
  :) echo "${USAGE_MESSAGE}"
     exit 1;;
  *) echo "${USAGE_MESSAGE}"
     exit 1;;
esac
done

shift $(($OPTIND - 1))

docker cp ./dumps/${BACKUP_ARCHIVE} mongodb-kapp:/dumps/${BACKUP_ARCHIVE}
docker exec -t mongodb-kapp mongorestore --gzip --archive=/dumps/${BACKUP_ARCHIVE}
