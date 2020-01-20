#
# Build stage
#
FROM  node:8-buster AS Build

ARG APP
ARG BRANCH
ARG FLAVOR
ARG WORKSPACE
ARG BUILD_NUMBER

ENV BUILD_NUMBER=$BUILD_NUMBER
ENV NODE_APP_INSTANCE=$FLAVOR

# Install the cli
WORKDIR /opt
RUN git clone https://github.com/kalisio/kdk.git && cd kdk && yarn  

# Install the app
RUN echo ${WORKSPACE}
COPY ${WORKSPACE} /opt/kdk/${APP}.js
WORKDIR /opt/kdk
RUN \
  node . ${APP}.js --clone ${BRANCH} && \
  node . ${APP}.js --install && \
  node . ${APP}.js --link && \
  cd ${APP} && yarn build > build.log 2>&1 && tail -n 24 build.log && \ 
  cd api && yarn build

#
# Run stage
#
FROM node:8-buster-slim
LABEL maintainer="contact@kalisio.xyz"

ARG APP
ARG FLAVOR
ARG BUILD_NUMBER

ENV BUILD_NUMBER=$BUILD_NUMBER
ENV NODE_APP_INSTANCE=$FLAVOR

COPY --from=Build /opt/kdk /opt/kdk

WORKDIR /opt/kdk
RUN node . ${APP}.js --link

WORKDIR /opt/kdk/${APP}
EXPOSE 8081
CMD [ "yarn", "prod" ]
