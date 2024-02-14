#!/usr/bin/env bash
set -euo pipefail
# set -x

JOB_ID=$1

THIS_FILE=$(readlink -f "${BASH_SOURCE[0]}")
THIS_PATH=$(dirname "$THIS_FILE")
ROOT_PATH=$(dirname "$THIS_PATH")

. "$THIS_PATH/kash/kash.sh"

### Github Actions

init_github_build_app() {
    install_reqs yq age sops nvm node16 node18 mongo4 mongo5 cc_test_reporter
    sudo apt-get update && sudo apt-get --no-install-recommends --yes install default-jre
}

begin_group "Init $CI_ID for $JOB_ID"

init_"${CI_ID}_${JOB_ID}"

end_group "Init $CI_ID for $JOB_ID"
