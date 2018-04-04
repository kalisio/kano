#!/bin/bash
docker pull kalisio/kapp
docker-compose -f docker-compose.yml up -d mongodb-kapp
docker-compose -f docker-compose.yml -f docker-compose.server-tests.yml up kapp
docker-compose -f docker-compose.yml -f docker-compose.client-tests.yml up -d kapp
docker-compose -f docker-compose.yml -f docker-compose.client-tests.yml up testcafe
