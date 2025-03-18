#!/usr/bin/env bash
set -uo pipefail
# set -x

APP=$1

THIS_FILE=$(readlink -f "${BASH_SOURCE[0]}")
THIS_DIR=$(dirname "$THIS_FILE")
ROOT_DIR=$(dirname "$THIS_DIR")

. "$THIS_DIR/kash/kash.sh"

# We expect the following to be defined as environment variables:
# - S3_BUCKET
# - RCLONE_CONF
# - SLACK_WEBHOOK

run_and_publish_e2e_tests_to_slack \
    "$ROOT_DIR" "$APP" \
    "$S3_BUCKET" "$RCLONE_CONF" \
    "$SLACK_WEBHOOK"
