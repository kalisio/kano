#!/usr/bin/env bash
set -euo pipefail
set -x

THIS_FILE=$(readlink -f "${BASH_SOURCE[0]}")
THIS_PATH=$(dirname "$THIS_FILE")
ROOT_PATH=$(dirname "$THIS_PATH")

. "$THIS_PATH/kash/kash.sh"

# APP=$(node -p -e "require('./package.json').name")
# NOTE: since kano is not renamed yet
APP=maps
VERSION=$(node -p -e "require('./package.json').version")

# MAJOR=$(grep "^([0-9]+)\..*")
# MINOR=$(grep "^([0-9]+)\..*")

GIT_TAG=$(get_git_tag)
GIT_BRANCH=$(get_git_branch)

BUILD_FLAVOR=dev
KLI_FILE="$APP"
if [[ "$GIT_TAG" =~ ^prod-v[0-9]+\.[0-9]+\.[0-9]+ ]]; then
    BUILD_FLAVOR=prod
    KLI_FILE="$APP-$VERSION"
elif [[ "$GIT_BRANCH" =~ ^test-*|-test$ ]]; then
    BUILD_FLAVOR=test
    KLI_FILE="$APP-$MAJOR.$MINOR"
fi

# CI needs to clone development repo
if [ "$CI" = true ]; then
    begin_group "Fetching project dependencies ..."

    KALISIO_DEVELOPMENT_DIR="$TMP_PATH/kalisio"
    mkdir -p "$KALISIO_DEVELOPMENT_DIR"

    # clone developement into $KALISIO_DEVELOPMENT_DIR
    git clone --depth 1 "https://$GITHUB_DEVELOPMENT_PAT@github.com/kalisio/development.git" "$KALISIO_DEVELOPMENT_DIR/development"

    # kli and dependencies
    git clone --depth 1 https://github.com/kalisio/kli.git "$KALISIO_DEVELOPMENT_DIR/kli"
    cd "$KALISIO_DEVELOPMENT_DIR/kli" && yarn install

    if [ -f "$KALISIO_DEVELOPMENT_DIR/development/workspaces/apps/$APP/$BUILD_FLAVOR/$KLI_FILE-$GIT_BRANCH.js" ]; then
        KLI_FILE="$KALISIO_DEVELOPMENT_DIR/development/workspaces/apps/$APP/$BUILD_FLAVOR/$KLI_FILE-$GIT_BRANCH.js"
    else
        KLI_FILE="$KALISIO_DEVELOPMENT_DIR/development/workspaces/apps/$APP/$BUILD_FLAVOR/$KLI_FILE.js"
    fi

    node "$KALISIO_DEVELOPMENT_DIR/kli" "$KLI_FILE" --clone --shallow-clone
    node "$KALISIO_DEVELOPMENT_DIR/kli" "$KLI_FILE" --install
    node "$KALISIO_DEVELOPMENT_DIR/kli" "$KLI_FILE" --link

    end_group "Fetching project dependencies ..."
fi

# ## Load project env
# ##

# . "$KALISIO_DEVELOPMENT_DIR/development/workspaces/tools/tools.sh" docker-bdortho

# ### Build and push container
# ###

# IMAGE_NAME="$KALISIO_HARBOR_URL/kalisio/docker-bdortho"
# IMAGE_TAG="latest"

# docker build -t "$IMAGE_NAME:$IMAGE_TAG" "$ROOT_PATH"

# docker login --username "$KALISIO_HARBOR_USERNAME" --password-stdin "$KALISIO_HARBOR_URL" < "$KALISIO_HARBOR_PASSWORD"
# docker push "$IMAGE_NAME:$IMAGE_TAG"
# docker logout "$KALISIO_HARBOR_URL"
