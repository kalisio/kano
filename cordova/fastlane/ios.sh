#!/bin/bash

# Generate AppFile
echo app_identifier\(\"com.kalisio.$APP\"\) > AppFile
echo apple_id\(\"$APPLE_ID\"\) >> AppFile
echo team_id\(\"$APPLE_TEAM_ID\"\) >> AppFile

