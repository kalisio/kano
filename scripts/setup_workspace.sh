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

#

run_meta_kli() {
    local WORK_DIR="$1"
    local NODE_VERSION="$2"
    local KLI_FILE="$3"
    local KLI_RUN="${4:-klifull}"

    if [[ ! -d "$WORK_DIR/meta-ekosystem" ]]; then
        local REPO_URL="${KALISIO_META_CLI_GIT_URL:-${KALISIO_GITHUB_URL:-}/kalisio/meta-ekosystem.git}"
        local REPO_DIR="${WORK_DIR}/meta-ekosystem"
        local REPO_REF="${KALISIO_META_CLI_GIT_REF:-}"

        git_shallow_clone "$REPO_URL" "$REPO_DIR" "$REPO_REF"

        cd "$REPO_DIR"
        nvm exec "$NODE_VERSION" pnpm install
        cd ~-
    fi

    local KLI_OPTS="--clone"
    [[ "$KLI_RUN" = klifull ]] && KLI_OPTS="$KLI_OPTS --install"
    cd "$WORK_DIR"
    nvm exec "$NODE_VERSION" node "$WORK_DIR/meta-ekosystem/packages/meta-cli/bin/kli.js" "$KLI_FILE" $KLI_OPTS
    cd ~-
}

#

WORKSPACE_BRANCH=
WORKSPACE_TAG=
WORKSPACE_NODE=24
WORKSPACE_KIND=klifull
OPT_LIST="n:k:"
if [ "$CI" != true ]; then
    OPT_LIST="b:n:t:k:"
fi

while getopts "$OPT_LIST" OPT; do
    case $OPT in
        b) # defines branch to pull
            WORKSPACE_BRANCH=$OPTARG;;
        n) # defines node version
            WORKSPACE_NODE=$OPTARG;;
        t) # defines tag to pull
            WORKSPACE_TAG=$OPTARG;;
        k) # workspace kind (nokli kli klifull)
            WORKSPACE_KIND=$OPTARG;;
        *)
        ;;
    esac
done

begin_group "Setting up workspace ..."

if [ "$CI" = true ]; then
    # workaround since repo is named 'kano' and in kli file it's 'maps'
    cd "$WORKSPACE_DIR"
    mv "kano" "maps" && ln -s "maps" "kano"
    cd ~-
else
    shift $((OPTIND-1))
    WORKSPACE_DIR="$1"

    # unset KALISIO_DEVELOPMENT_DIR because we want kli to clone everyhting in $WORKSPACE_DIR
    unset KALISIO_DEVELOPMENT_DIR
fi

git_shallow_clone "$KALISIO_GITHUB_URL/kalisio/development.git" "$WORKSPACE_DIR/development"

if [[ "$WORKSPACE_KIND" = kli ]] || [[ "$WORKSPACE_KIND" = klifull ]]; then
    KLI_FILE=$(get_kli_file "$WORKSPACE_DIR/development/workspaces/apps" "kano" "$ROOT_DIR" "${WORKSPACE_TAG:-$WORKSPACE_BRANCH}")
    run_meta_kli "$WORKSPACE_DIR" "$WORKSPACE_NODE" "$KLI_FILE" "$WORKSPACE_KIND"
fi

end_group "Setting up workspace ..."
