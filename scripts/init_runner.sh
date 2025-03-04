#!/usr/bin/env bash
set -euo pipefail
# set -x

JOB_ID=$1

THIS_FILE=$(readlink -f "${BASH_SOURCE[0]}")
THIS_DIR=$(dirname "$THIS_FILE")

. "$THIS_DIR/kash/kash.sh"

### Github Actions

init_github_run_tests() {
    install_reqs age sops nvm node20 mongo7 cc_test_reporter
}

init_github_build_app() {
    install_reqs age sops nvm node20
}

init_github_build_e2e_tests() {
    install_reqs age sops nvm node20
}

init_github_build_docs() {
    install_reqs age sops nvm node18
}

init_github_additional_tests() {
    install_reqs age sops nvm node22 mongo7
}

begin_group "Init $CI_ID for $JOB_ID"

init_"${CI_ID}_${JOB_ID}"

end_group "Init $CI_ID for $JOB_ID"
