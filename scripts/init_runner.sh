#!/usr/bin/env bash
set -euo pipefail
# set -x

JOB_ID=$1

THIS_FILE=$(readlink -f "${BASH_SOURCE[0]}")
THIS_DIR=$(dirname "$THIS_FILE")
ROOT_DIR=$(dirname "$THIS_DIR")
WORKSPACE_DIR="$(dirname "$ROOT_DIR")"

. "$THIS_DIR/kash/kash.sh"

###

# Install Kalisio's meta cli
# Expected environnment variables:
#  - KALISIO_META_CLI_GIT_URL the url where to clone the meta-ekosystem repository
#  - or KALISIO_GITHUB_URL the base url to clone private repositories in the kalisio org
#  - KALISIO_METAèCLI_GIT_REF the git tag/branch/commit to pull when cloning the repo
install_meta_cli() {
    local REPO_URL="${KALISIO_META_CLI_GIT_URL:-${KALISIO_GITHUB_URL:-}/kalisio/meta-ekosystem.git}"
    local REPO_DIR="$1/meta-ekosystem"
    local REPO_REF="${KALISIO_META_CLI_GIT_REF:-}"

    git_shallow_clone "$REPO_URL" "$REPO_DIR" "$REPO_REF"

    cd "$REPO_DIR"
    pnpm install
    cd packages/meta-cli
    PNPM_HOME=~/.local/bin pnpm link
    cd ~-
}

###

### Github Actions

init_github_run_tests() {
    install_reqs age sops nvm node24 mongo7 sonar_scanner_cli meta_cli
}

init_github_build_app() {
    install_reqs age sops nvm node24 meta_cli
}

init_github_build_e2e_tests() {
    install_reqs age sops nvm node24
}

init_github_build_docs() {
    install_reqs age sops nvm node20
}

init_github_additional_tests() {
    install_reqs age sops nvm node20 node22 mongo7 mongo8 meta_cli
}

### e2e tests runner (dedicated container, outside any CI system)

init__run_e2e_tests() {
    install_reqs yq
}

begin_group "Init $CI_ID for $JOB_ID"

init_"${CI_ID}_${JOB_ID}"

end_group "Init $CI_ID for $JOB_ID"
