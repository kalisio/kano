---
sidebarDepth: 3
---

# Installing services

## Using Kargo

You can easily connect Kano with geospatial services deployed by [Kargo](https://kalisio.github.io/kargo/) through its [API gateway](https://kalisio.github.io/kargo/guides/advanced-usage.html#using-the-api-gateway). First add the Kano application/consumer in the gateway configuration by generating a [UUID](https://www.uuidgenerator.net/):
```
users: {
  my_user: {
    'kano': {
      scopes: ['wms', 'wmts', 'tms', 'wfs', 'wcs', 'k2'],
      credential: {
        type: 'jwt',
        keyId: '9ba09ead-23e1-4020-9994-aa9130782b09',
        keySecret: '${APP_SECRET}'
      }
    }
  }
}
```
Then add the following environment variables before launching the Kano backend:
```bash
// Setup the target gateway
export API_GATEWAY_URL="https://api.your.kargo.domain"
export APP_ID="9ba09ead-23e1-4020-9994-aa9130782b09"
yarn dev
```
This will automatically generate a valid token for the gateway once you log in and add it to any request targeting a service behind the gateway.

Kargo can also automatically deploy for you krawler jobs, [Kapture](https://github.com/kalisio/kapture), [Geokoder](https://kalisio.github.io/geokoder/), [K2](https://github.com/kalisio/k2), etc. as [services](https://kalisio.github.io/kargo/guides/understanding-kargo.html#service).

## Using Docker

As for Kano we provide Docker images on the [Docker Hub](https://hub.docker.com/r/kalisio/kano/) to ease deploying your own service instances. Although it's possible to directly run Docker commands we provide you with [docker-compose](https://docs.docker.com/compose/) files to ease deployment, in addition to minimalist configuration files. These files will be detailed in the following sections and are available in the [public folder](https://github.com/kalisio/kano/tree/master/docs/.vitepress/public) of the documentation.

### Add gateway

The following commands and additional docker-compose file should do the job:

```bash
// Run the Gateway and Kano containers
docker-compose -f docker-compose.yml -f docker-compose-gateway.yml up -d
// Stop the Gateway and Kano containers
docker-compose -f docker-compose.yml -f docker-compose-gateway.yml down
// Stop the Gateway and Kano containers erasing DB data
docker-compose -f docker-compose.yml -f docker-compose-gateway.yml down -v
```

::: details docker-compose-gateway.yml - Used to deploy gateway container.
<<< @/.vitepress/public/docker-compose-gateway.yml
:::

### Add kapture

Kano integrates smoothly with [Kapture](https://github.com/kalisio/kapture) in order to perform customizable screenshots, i.e. map prints.

The following commands and additional docker-compose file should do the job:

```bash
// Run the Gateway, Kapture and Kano containers
docker-compose -f docker-compose.yml -f docker-compose-gateway.yml -f docker-compose-kapture.yml up -d
// Stop the Gateway, Kapture and Kano containers
docker-compose -f docker-compose.yml -f docker-compose-gateway.yml -f docker-compose-kapture.yml down
// Stop the Gateway, Kapture and Kano containers erasing DB data
docker-compose -f docker-compose.yml -f docker-compose-gateway.yml -f docker-compose-kapture.yml down -v
```

::: details docker-compose-kapture.yml - Used to deploy kapture container.
<<< @/.vitepress/public/docker-compose-kapture.yml
:::

### Add geokoder

Kano integrates smoothly with [Geokoder](https://kalisio.github.io/geokoder/) in order to perform geocoding.

The following commands and additional docker-compose file should do the job:

```bash
// Run the Gateway, Geokoder and Kano containers
docker-compose -f docker-compose.yml -f docker-compose-gateway.yml -f docker-compose-geokoder.yml up -d
// Stop the Gateway, Geokoder and Kano containers
docker-compose -f docker-compose.yml -f docker-compose-gateway.yml -f docker-compose-geokoder.yml down
// Stop the Gateway, Geokoder and Kano containers erasing DB data
docker-compose -f docker-compose.yml -f docker-compose-gateway.yml -f docker-compose-geokoder.yml down -v
```

::: details docker-compose-geokoder.yml - Used to deploy geokoder container.
<<< @/.vitepress/public/docker-compose-geokoder.yml
:::

### Add k2

**Coming soon**

## From source code

First you have to ensure the [KDK prerequisites](https://kalisio.github.io/kdk/guides/development/setup.html#prerequisites) to run services from source code.

### Add gateway

As the goal here is not to test, inspect or develop the gateway itself, but rather the underlying services, we will run the gateway using a Docker container in `host` network mode to ensure it can access services deployed on your `localhost`:
```bash
docker run --name="gateway" --network="host" --rm --init -it -e "PORT=8082" -e "KAPTURE_URL=http://localhost:8083" -e "GEOKODER_URL=http://localhost:8084" --mount type=bind,source=./gateway.config.yml,target=/var/lib/eg/gateway.config.yml,readonly kalisio/express-gateway:1.16.9
```

::: tip
To get details about the `gateway.config.yml` file used to deploy gateway container please refer to the previous Docker-based section.
:::

After launching the gateway change the following environment variables before launching the Kano backend:
```bash
// Setup the target gateway
export API_GATEWAY_URL="http://localhost:8082"
yarn dev
```

### Add kapture

Once Kano and the gateway are running, the following commands should launch your local instance of Kapture:

```bash
// Clone Kapture
git clone https://github.com/kalisio/geokoder.git
cd geokoder
yarn install
// Set the most minimalist environment to run server
export PORT="8083"
export NODE_OPTIONS="--inspect-port=9233"
export KANO_URL="http://localhost:8080"
export KANO_JWT="eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJhdWQiOiJrYWxpc2lvIiwiaXNzIjoia2FsaXNpbyJ9._HslaK0hTlISw_wGkUJYmpZdcNuWWGB1iHJDApeJxWk"
yarn dev
```

### Add geokoder

Once Kano and the gateway is running, the following commands should launch your local instance of Geokoder:

```bash
// Clone Geokoder
git clone https://github.com/kalisio/geokoder.git
cd geokoder
yarn install
// Copy local configuration (see previous Docker-based deployment section)
cp local-geokoder.cjs ./config/local.cjs
// Set the most minimalist environment to run server
export PORT="8084"
export NODE_OPTIONS="--inspect-port=9234"
yarn dev
```

### Add k2

**Coming soon**

