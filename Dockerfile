FROM node:8-buster-slim
LABEL maintainer="contact@kalisio.xyz"

ARG APP
ARG FLAVOR
ARG BUILD_NUMBER

ENV BUILD_NUMBER=$BUILD_NUMBER
ENV NODE_APP_INSTANCE=$FLAVOR

# Copy the built artefacr
COPY kdk.tgz /opt/.

# Uncompress the artefact
WORKDIR /opt
RUN tar zxf kdk.tgz && rm kdk.tgz

# Link the modules
WORKDIR /opt/kdk
RUN node . ${APP}.js --link

# Run the app
WORKDIR /opt/kdk/${APP}
EXPOSE 8081
CMD [ "yarn", "prod" ]
