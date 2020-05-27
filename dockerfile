FROM node:12.16-buster-slim
LABEL maintainer="contact@kalisio.xyz"

ARG APP
ARG FLAVOR
ARG BUILD_NUMBER

ENV BUILD_NUMBER=$BUILD_NUMBER
ENV NODE_APP_INSTANCE=$FLAVOR

# Install curl
RUN apt-get update && apt-get -y install curl

# Copy the built artefact.
# Warning - 
# We could do ADD and let Docker uncompress automatically the archive but we reach log limit in Travis.
# So we copy the archive and uncompress it usin tar without the verbose mode
COPY kalisio.tgz /opt/.
WORKDIR /opt
RUN tar zxf kalisio.tgz && rm kalisio.tgz

# Link the modules
WORKDIR /opt/kalisio
RUN node . ${APP}.js --link

# Run the app
WORKDIR /opt/kalisio/${APP}
EXPOSE 8081
CMD [ "yarn", "prod" ]
