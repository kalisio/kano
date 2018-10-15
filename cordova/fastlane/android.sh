#!/bin/bash

# Generate AppFile
echo json_key_file\(\"google-play.json\"\) > Appfile
echo package_name\(\"com.kalisio.$APP\"\) >> Appfile
