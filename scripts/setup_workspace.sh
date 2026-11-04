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
    KLI_OPTS="--clone"
    [[ "$WORKSPACE_KIND" = klifull ]] && KLI_OPTS="$KLI_OPTS --install"
    cd "$WORKSPACE_DIR" && kli "$KLI_FILE" $KLI_OPTS
fi

end_group "Setting up workspace ..."
