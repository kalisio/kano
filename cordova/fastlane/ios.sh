#!/bin/bash

# Generate Appfile
echo app_identifier\(\"com.kalisio.$APP\"\) > Appfile
echo apple_id\(\"$APPLE_ID\"\) >> Appfile
echo team_id\(\"$APPLE_TEAM_ID\"\) >> Appfile

# Overwrite matchfile
# echo app_identifier\(\"com.kalisio.$APP\"\) >> Matchfile
# echo username\(\"$APPLE_ID\"\) >> Matchfile

# Configure Travis to access the certificates repo
# echo -e "machine github.com\n  login $GITHUB_TOKEN" > ~/.netrc

# fastlane match development



