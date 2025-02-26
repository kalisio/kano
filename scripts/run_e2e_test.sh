#!/usr/bin/env bash
set -uo pipefail
# set -x

APP=$1

THIS_FILE=$(readlink -f "${BASH_SOURCE[0]}")
THIS_DIR=$(dirname "$THIS_FILE")
ROOT_DIR=$(dirname "$THIS_DIR")

. "$THIS_DIR/kash/kash.sh"

## Run e2e tests
##

# SLACK_WEBHOOK is set upon Kubernetes container startup
run_e2e_tests "$ROOT_DIR" "$APP" "$SLACK_WEBHOOK"