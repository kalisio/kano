## DEVELOPERS NOTE: 
## This Dockerfile must be run with the --cap-add=SYS_ADMIN option to ensure proper functionality.

ARG DEBIAN_VERSION=bookworm
ARG NODE_VERSION=20

## Use a builder
##

FROM node:${NODE_VERSION}-${DEBIAN_VERSION}-slim AS builder
LABEL maintainer="contact@kalisio.xyz"

COPY . /opt/kalisio

# Setting environment variables
ARG APP

# Development environment setup
WORKDIR /opt/kalisio/

# Install git (because some dependencies are not available on npm)
RUN apt-get update && apt-get install -y git
RUN \
  cd /opt/kalisio/kdk && yarn && yarn link --link-folder /opt/kalisio/yarn-links && \
  cd /opt/kalisio/$APP && yarn && yarn link "@kalisio/kdk" --link-folder /opt/kalisio/yarn-links

## Copy to final container
##

FROM node:${NODE_VERSION}-${DEBIAN_VERSION}-slim
LABEL maintainer="contact@kalisio.xyz"

# Setting environment variables
ARG APP
ARG NODE_APP_INSTANCE
ARG SUBDOMAIN

ENV APP=$APP
ENV NODE_APP_INSTANCE=$NODE_APP_INSTANCE
ENV SUBDOMAIN=$SUBDOMAIN
ENV HEADLESS=true

# Setup Puppeteer & Rclone and installation of the necessary packages
# https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#running-puppeteer-in-docker
RUN export DEBIAN_FRONTEND=noninteractive \
  && apt-get update \
  && apt-get install -y wget gnupg curl zip rclone git \
  && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update \
  && apt-get install -y \
    google-chrome-stable \
    fonts-ipafont-gothic \
    fonts-wqy-zenhei \
    fonts-thai-tlwg \
    fonts-kacst \
    fonts-freefont-ttf \
    libxss1 \
    --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

# Copy Puppeteer cache from builder
COPY --from=Builder --chown=node:node /root/.cache/puppeteer /home/node/.cache/puppeteer

# Copy from builder
COPY --from=Builder --chown=node:node /opt/kalisio /opt/kalisio

# From now on, run stuff as 'node'
USER node

# Create the .config/rclone directory and set the necessary permissions
RUN mkdir -p /home/node/.config/rclone \
  && chown -R node:node /home/node/.config/rclone \
  && chmod -R 777 /home/node/.config/rclone

# Make sure runner is properly setup
RUN mkdir -p /home/node/.local/bin && /opt/kalisio/$APP/scripts/init_runner.sh run_e2e_tests

# Run tests
WORKDIR /opt/kalisio/$APP
ENV PATH="$PATH:/home/node/.local/bin"
CMD ["bash", "-c", "/opt/kalisio/$APP/scripts/run_e2e_tests.sh $APP"]
