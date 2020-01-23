FROM node:8-buster-slim
LABEL maintainer="contact@kalisio.xyz"

ARG APP
ARG FLAVOR
ARG BUILD_NUMBER

ENV BUILD_NUMBER=$BUILD_NUMBER
ENV NODE_APP_INSTANCE=$FLAVOR

# Copy the built artefact.
# Warning - 
# We could do ADD and let Docker uncompress automatically the archive but we reach log limit in Travis.
# So we copy the archive and uncompress it usin tar without the verbose mode
COPY kdk.tgz /opt/.
WORKDIR /opt
RUN tar zxf kdk.tgz && rm kdk.tgz

# Link the modules
WORKDIR /opt/kdk
RUN node . ${APP}.js --link

# Run the app
WORKDIR /opt/kdk/${APP}
EXPOSE 8081
CMD [ "yarn", "prod" ]
