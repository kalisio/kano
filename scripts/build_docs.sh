#!/usr/bin/env bash
set -euo pipefail
# set -x

THIS_FILE=$(readlink -f "${BASH_SOURCE[0]}")
THIS_DIR=$(dirname "$THIS_FILE")
ROOT_DIR=$(dirname "$THIS_DIR")
WORKSPACE_DIR="$(dirname "$ROOT_DIR")"

. "$THIS_DIR/kash/kash.sh"

slack_report() {
    slack_ci_report "$ROOT_DIR" "$CI_STEP_NAME" "$KASH_EXIT_CODE" "$SLACK_WEBHOOK_APPS"
}

## Parse options
##

PUBLISH=false
CI_STEP_NAME="Build docs"
while getopts "pr:" OPT; do
    case $OPT in
        p) # define to publish docs
            PUBLISH=true
            ;;
        r) # report outcome to slack
            CI_STEP_NAME=$OPTARG
            load_env_files "$WORKSPACE_DIR/development/common/SLACK_WEBHOOK_APPS.enc.env"
            add_function_to_trap slack_report
            ;;
        *)
            ;;
    esac
done

## Build docs
##

build_docs "$ROOT_DIR" "kalisio/kano" "$PUBLISH"
