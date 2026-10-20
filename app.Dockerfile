ARG DEBIAN_VERSION=bookworm
ARG NODE_VERSION=24


## Use a builder
##

FROM node:${NODE_VERSION}-${DEBIAN_VERSION}-slim AS builder
LABEL maintainer="contact@kalisio.xyz"

# git is required to pull some node packages from github
RUN DEBIAN_FRONTEND=noninteractive && \
  apt-get update && \
  apt-get --no-install-recommends --yes install \
    ca-certificates git

COPY . /opt/kalisio

ARG APP
ARG FLAVOR
ARG BUILD_NUMBER
ARG DEBUG

ENV BUILD_NUMBER=$BUILD_NUMBER
ENV NODE_APP_INSTANCE=$FLAVOR
ENV DEBUG=$DEBUG
ENV PUPPETEER_SKIP_DOWNLOAD=true

# Use the pnpm version required by the app (packageManager field)
RUN npm install -g pnpm@$(node -p "require('/opt/kalisio/$APP/package.json').packageManager.split('@')[1]")

# Setup kli
WORKDIR /opt/kalisio/kli
RUN yarn install

# Setup app & cleanup workspace
WORKDIR /opt/kalisio/
RUN \
  LINK=1 KLI_FILE=/opt/kalisio/kli.js KALISIO_DEVELOPMENT_DIR=/opt/kalisio \
    node /opt/kalisio/kli/index.js /opt/kalisio/kli.js --install --fail-on-error && \
  cd /opt/kalisio/common-ekosystem && pnpm build && \
  cd /opt/kalisio/kdk-ekosystem && pnpm -r --filter './packages/*' --filter '!@kalisio/kdk-core-ui' build && \
  cd /opt/kalisio/$APP && pnpm pwa:build && \
  rm -fR /opt/kalisio/kli /opt/kalisio/kli.js


## Copy to final container
##

FROM node:${NODE_VERSION}-${DEBIAN_VERSION}-slim
LABEL maintainer="contact@kalisio.xyz"

ARG APP
ARG FLAVOR
ARG BUILD_NUMBER

ENV BUILD_NUMBER=$BUILD_NUMBER
ENV NODE_APP_INSTANCE=$FLAVOR

COPY --from=builder --chown=node:node /opt/kalisio /opt/kalisio
RUN npm install -g pnpm@$(node -p "require('/opt/kalisio/$APP/package.json').packageManager.split('@')[1]")
# From now on, run stuff as 'node'
USER node

# Run the app
EXPOSE 8081
WORKDIR /opt/kalisio/$APP
CMD [ "pnpm", "prod" ]
