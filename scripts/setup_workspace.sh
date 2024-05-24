#!/usr/bin/env bash
set -euo pipefail
# set -x

THIS_FILE=$(readlink -f "${BASH_SOURCE[0]}")
THIS_DIR=$(dirname "$THIS_FILE")
ROOT_DIR=$(dirname "$THIS_DIR")

. "$THIS_DIR/kash/kash.sh"

## Parse options
##

WORKSPACE_BRANCH=
WORKSPACE_TAG=
WORKSPACE_NODE=16
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
    WORKSPACE_DIR="$(dirname "$ROOT_DIR")"
    DEVELOPMENT_REPO_URL="https://$GITHUB_DEVELOPMENT_TOKEN@github.com/kalisio/development.git"

    # workaround since repo is named 'kano' and in kli file it's 'maps'
    cd "$WORKSPACE_DIR"
    mv "kano" "maps" && ln -s "maps" "kano"
    cd ~-
else
    shift $((OPTIND-1))
    WORKSPACE_DIR="$1"
    DEVELOPMENT_REPO_URL="$GITHUB_URL/kalisio/development.git"

    # unset KALISIO_DEVELOPMENT_DIR because we want kli to clone everyhting in $WORKSPACE_DIR
    unset KALISIO_DEVELOPMENT_DIR
fi

setup_app_workspace \
    "$ROOT_DIR" \
    "$WORKSPACE_DIR" \
    "$DEVELOPMENT_REPO_URL" \
    "$WORKSPACE_NODE" \
    "workspaces/apps" \
    "$WORKSPACE_KIND" \
    "${WORKSPACE_TAG:-$WORKSPACE_BRANCH}"

end_group "Setting up workspace ..."
