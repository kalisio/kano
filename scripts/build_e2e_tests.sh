#!/usr/bin/env bash
set -euo pipefail
# set -x

THIS_FILE=$(readlink -f "${BASH_SOURCE[0]}")
THIS_DIR=$(dirname "$THIS_FILE")
ROOT_DIR=$(dirname "$THIS_DIR")
WORKSPACE_DIR="$(dirname "$ROOT_DIR")"

. "$THIS_DIR/kash/kash.sh"

## Parse options
##

PUBLISH=false
while getopts "pr:" option; do
    case $option in
        p) # define to publish container to registry
            PUBLISH=true
            ;;
        r) # report outcome to slack
            load_env_files "$WORKSPACE_DIR/development/common/SLACK_WEBHOOK_APPS.enc.env"
            CI_STEP_NAME=$OPTARG
            trap 'slack_ci_report "$ROOT_DIR" "$CI_STEP_NAME" "$?" "$SLACK_WEBHOOK_APPS"' EXIT
            ;;
        *)
            ;;
    esac
done

## Build e2e tests
##

init_app_infos "$ROOT_DIR" "$WORKSPACE_DIR/development/workspace/apps"

APP=$(get_app_name)
VERSION=$(get_app_version)
FLAVOR=$(get_app_flavor)

load_env_files "$WORKSPACE_DIR/development/common/kalisio_harbor.enc.env"
load_value_files "$WORKSPACE_DIR/development/common/KALISIO_HARBOR_PASSWORD.enc.value"

IMAGE_NAME="kalisio/$APP-e2e-tests"
IMAGE_TAG="$VERSION-$FLAVOR"
SUBDOMAIN="dev.kalisio.xyz"

case "$FLAVOR" in
     "prod")
         SUBDOMAIN="kalisio.com"
         ;;
     "test")
         SUBDOMAIN="test.kalisio.xyz"
         ;;
     *)
         ;;
esac

build_e2e_tests \
    "$ROOT_DIR" "$SUBDOMAIN" "$PUBLISH" \
    "$KALISIO_HARBOR_URL" "$KALISIO_HARBOR_USERNAME" "$KALISIO_HARBOR_PASSWORD" \
    "$IMAGE_NAME" "$IMAGE_TAG"
