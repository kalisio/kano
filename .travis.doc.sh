#!/bin/bash

rm .postcssrc.js && cd docs && yarn install && yarn build
RESULT_CODE=$?
if [ $RESULT_CODE -ne 0 ]; then
  echo "Doc generation failed [error: $RESULT_CODE]"
	exit 1
fi
