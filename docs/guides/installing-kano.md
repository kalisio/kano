---
sidebarDepth: 3
---

# Installing Kano

### The easy way : using Docker

::: warning 
This requires you to [install Docker](https://docs.docker.com/engine/installation/), the world’s leading software container platform.
::: 

We provide Docker images on the [Docker Hub](https://hub.docker.com/r/kalisio/kano/) to ease deploying your own instance. To run correctly it has to be linked with a standard [MongoDB container](https://hub.docker.com/_/mongo/) for the database. Although it's possible to directly run Docker commands we provide you with [docker-compose](https://docs.docker.com/compose/) files to ease deployment.

The following commands should do the job:

```bash
// Run the MongoDB and Kano containers
docker-compose up -d

// Stop the MongoDB and Kano containers
docker-compose down
// Stop the MongoDB and Kano containers erasing DB data
docker-compose down -v
```

Then point your browser to [localhost:8080](http://localhost:80801).

::: warning
If running Docker under Windows in a virtual machine first redirect the port 8080 of your virtual machine to your host
:::

::: details docker-compose.yml - Used to deploy MongoDB and Kano containers.
<<< @/.vuepress/public/docker-compose.yml
:::

Kano comes with a default set of users but you should change this default configuration for a public deployment and avoid leaking login/passwords. Similarly, Kano comes with a default set of layers targeting geospatial services deployed by [Kargo](https://kalisio.github.io/kargo/) and you should add your own data layers instead. This is done by configuration using the following files:

::: details local.js - Used to override the default backend configuration and setup a default user.
To be put in the `kano/api/config` directory.

<<< @/.vuepress/public/local.js
:::
::: details my-layers.js - Used to define the available default layers.
To be put in the `kano/api/config/layers` directory. Example based on OpenStreeetMap [tile servers](https://wiki.openstreetmap.org/wiki/Tile_servers) and [IGN web services]https://geoservices.ign.fr/services-web-experts-cartes).

<<< @/.vuepress/public/my-layers.js
:::

As detailed in the [KDK documentation](https://kalisio.github.io/kdk/guides/development/deploy.html#deployment-flavors) Kano comes into three different flavors. By default the docker-compose file targets the latest development version but you can change it to target a production release.

::: tip
If you'd like to use the 3D mode or the Mapillary layer you should provide the required tokens to access their respective API on the backend side using the following environment variables: `CESIUM_TOKEN`, `MAPILLARY_TOKEN`.
:::

::: warning
By default no built-in layers are available in Kano unless you specify their names using the `LAYERS_FILTER` environment variable. You can however directly add new layers using the Kano GUI (through the add layer button or by drag'n'drop on the map).
:::

### The hard way : from source code

First you have to ensure the [KDK prerequisites](https://kalisio.github.io/kdk/guides/development/setup.html#prerequisites) to run Kano from source code. Then the following commands, assuming you have a MongoDB instance running on local host and default port (27017), should launch your local instance of Kano:

```bash
// Clone KDK
git clone https://github.com/kalisio/kdk.git
cd kdk
yarn install
yarn link
yarn watch

// In another terminal clone Kano
git clone https://github.com/kalisio/kano.git

// Set the most minimalist environment to run server
export APP_SECRET="xxx"
export LAYERS_FILTER="OSM PLAN_IGN CESIUM_ELLIPSOID"

// Run the server/API
cd kano/api
// Copy custom configuration files
cp local.js config
cp my-layers.js config/layers
yarn install
yarn link @kalisio/kdk
yarn dev

// In another terminal run the client app
cd kano
yarn install
yarn link @kalisio/kdk
yarn dev
```

Point your browser to [localhost:8080](http://localhost:8080).
