#!/usr/bin/env bash
set -euo pipefail
# set -x

JOB_ID=$1

THIS_FILE=$(readlink -f "${BASH_SOURCE[0]}")
THIS_DIR=$(dirname "$THIS_FILE")

. "$THIS_DIR/kash/kash.sh"

### Github Actions

init_github_run_tests() {
    install_reqs age sops nvm node20 mongo7
}

init_github_build_app() {
    install_reqs age sops nvm node20
}

init_github_build_e2e_tests() {
    install_reqs age sops nvm node20
}

init_github_build_docs() {
    install_reqs age sops nvm node20
}

init_github_additional_tests() {
    install_reqs age sops nvm node22 mongo7
}

### e2e tests runner (dedicated container, outside any CI system)

init__run_e2e_tests() {
    install_reqs yq
}

begin_group "Init $CI_ID for $JOB_ID"

init_"${CI_ID}_${JOB_ID}"

end_group "Init $CI_ID for $JOB_ID"
