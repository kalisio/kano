ARG DEBIAN_VERSION=bookworm
ARG NODE_VERSION=20


## Use a builder
##

FROM node:${NODE_VERSION}-${DEBIAN_VERSION}-slim as Builder
LABEL maintainer="contact@kalisio.xyz"

# git is required to pull some node packages from github
RUN DEBIAN_FRONTEND=noninteractive && \
  apt-get update && \
  apt-get --no-install-recommends --yes install \
    ca-certificates git

COPY . /opt/kalisio

# Setup kli
WORKDIR /opt/kalisio/kli
RUN yarn install

ARG APP
ARG FLAVOR
ARG BUILD_NUMBER
ARG DEBUG

ENV BUILD_NUMBER=$BUILD_NUMBER
ENV NODE_APP_INSTANCE=$FLAVOR
ENV DEBUG=$DEBUG

# Setup app & cleanup workspace
WORKDIR /opt/kalisio/
RUN \
  node /opt/kalisio/kli/index.js /opt/kalisio/kli.js --install --fail-on-error && \
  node /opt/kalisio/kli/index.js /opt/kalisio/kli.js --link --link-folder /opt/kalisio/yarn-links --fail-on-error && \
  cd /opt/kalisio/$APP && yarn pwa:build && \
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

COPY --from=Builder --chown=node:node /opt/kalisio /opt/kalisio
# From now on, run stuff as 'node'
USER node

# Run the app
EXPOSE 8081
WORKDIR /opt/kalisio/$APP
CMD [ "yarn", "prod" ]
