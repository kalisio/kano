#!/bin/bash

cd docs && yarn install && yarn docs:build
RESULT_CODE=$?
if [ $RESULT_CODE -ne 0 ]; then
  echo "Doc generation failed [error: $RESULT_CODE]"
	exit 1
fi
