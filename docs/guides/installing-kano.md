---
sidebarDepth: 3
---

# Installing Kano

## Using Docker

::: warning 
This requires you to [install Docker](https://docs.docker.com/engine/installation/), the world’s leading software container platform.
::: 

We provide Docker images on the [Docker Hub](https://hub.docker.com/r/kalisio/kano/) to ease deploying your own instance. To run correctly it has to be linked with a standard [MongoDB container](https://hub.docker.com/_/mongo/) for the database. Although it's possible to directly run Docker commands we provide you with [docker-compose](https://docs.docker.com/compose/) files to ease deployment, in addition to minimalist configuration files. These files will be detailed in the following sections and are available in the [public folder](https://github.com/kalisio/kano/tree/master/docs/.vitepress/public) of the documentation.

Once you have retrieved the required docker-compose and configuration files, jump into the folder with the docker-compose and configuration files, the following commands should do the job:

```bash
// Run the MongoDB and Kano containers
docker-compose up -d

// Stop the MongoDB and Kano containers
docker-compose down
// Stop the MongoDB and Kano containers erasing DB data
docker-compose down -v
```

Then point your browser to [localhost:8080](http://localhost:8080). You should see something like this once connected:

![installation](../.vitepress/public/images/kano-installation.png)

::: tip
Check the `local.cjs` configuration file below to find the required login information
:::

::: warning
If running Docker under Windows in a virtual machine first redirect the port 8080 of your virtual machine to your host
:::

::: details docker-compose.yml - Used to deploy MongoDB and Kano containers.
<<< ../.vitepress/public/docker-compose.yml
:::

Kano comes with a default set of users but you should change this default configuration for a public deployment and avoid leaking login/passwords. Similarly, Kano comes with a default set of layers targeting geospatial services deployed by [Kargo](https://kalisio.github.io/kargo/) and you should add your own data layers instead. This is done by configuration using the following files:

::: details local.cjs - Used to override the default backend configuration and setup a default user.
To be put in the `kano/api/config` directory.

<<< ../.vitepress/public/local-kano.cjs
:::
::: details my-layers.cjs - Used to define the available default layers.
To be put in the `kano/api/config/layers` directory. Example based on OpenStreeetMap [tile servers](https://wiki.openstreetmap.org/wiki/Tile_servers) and [IGN web services](https://geoservices.ign.fr/services-web-experts-cartes).

<<< ../.vitepress/public/my-layers.cjs
:::

As detailed in the [KDK documentation](https://kalisio.github.io/kdk/guides/development/deploy.html#deployment-flavors) Kano comes into three different flavors. By default the docker-compose file targets the latest development version (`dev` tag) but you can change it to target either a beta (`test` tag) or a production (`prod` tag) release.

::: warning
By default no built-in layers are available in Kano unless you specify their names using the `LAYERS_FILTER` environment variable. By defining `LAYERS_FILTER=*` you will get all built-in layers but take care that a lot of them requires additional services to work correctly (read following sections below). You can however directly add new layers using the Kano GUI (through the add layer button or by drag'n'drop on the map).
:::

::: tip
If you'd like to use the 3D mode or the Mapillary layer you should provide the required tokens to access their respective APIs on the backend side by setting the following environment variables: `CESIUM_TOKEN`, `MAPILLARY_TOKEN`.
:::

### Add weather forecasts

Kano integrates smoothly with [Weacast](https://weacast.github.io/weacast/) in order to display weather forecast data. You can also use Docker containers to run Weacast by following [this guide](https://weacast.github.io/weacast/guides/basics.html#the-easy-way-using-docker) and taking care of port conflicts as they use the same by default.

The following commands and additional docker-compose file should do the job:

```bash
// Run the MongoDB, Weacast and Kano containers
docker-compose -f docker-compose.yml -f docker-compose-weacast.yml up -d

// Stop the MongoDB, Weacast and Kano containers
docker-compose -f docker-compose.yml -f docker-compose-weacast.yml down 
// Stop the MongoDB, Weacast and Kano containers erasing DB data
docker-compose -f docker-compose.yml -f docker-compose-weacast.yml down -v
```

Wait a couple of minutes so that Weacast feeds the database with the latest forecast then point your browser to [localhost:8080](http://localhost:8080). You should see something like this once connected if you display some meteorological layers and probe a location:

![installation](../.vitepress/public/images/weacast-installation.png)

::: details docker-compose-weacast.yml - Used to deploy Weacast container.
<<< ../.vitepress/public/docker-compose-weacast.yml
:::

::: tip
You should activate the built-in Weacast layers like `WIND_TILED` in Kano using the `LAYERS_FILTER` environment variable.
:::

### Add krawler jobs

Kano integrates smoothly with [Krawler jobs](https://kalisio.github.io/krawler) in order to feed data for near real-time measurements/observations layers. A lot of built-in layers requires the associated job(s) to be deployed beside Kano. You can search for available jobs in our [GitHub organisation](https://github.com/orgs/kalisio/repositories?language=&q=krawler&sort=&type=all) and find more information about available layers in the [Kalisio Crisis catalog](https://crisis.com/gofurther/catalog.html).

For the purpose of this documentation we will focus on the [k-hubeau](https://github.com/kalisio/k-hubeau) hydro jobs but others jobs work similarly. The following commands and additional docker-compose file should do the job:

```bash
// Run the MongoDB, Hubeau jobs and Kano containers
docker-compose -f docker-compose.yml -f docker-compose-hubeau.yml up -d

// Stop the MongoDB, Hubeau jobs and Kano containers
docker-compose -f docker-compose.yml -f docker-compose-hubeau.yml down 
// Stop the MongoDB, Hubeau jobs and Kano containers erasing DB data
docker-compose -f docker-compose.yml -f docker-compose-hubeau.yml down -v
```

Wait a couple of minutes so that the jobs feeds the database with the latest observations then point your browser to [localhost:8080](http://localhost:8080). You should see something like this once connected if you display the observations layer, zoom in and pick a station:

![installation](../.vitepress/public/images/hubeau-installation.png)

::: details docker-compose-hubeau.yml - Used to deploy Hubeau jobs containers.
<<< ../.vitepress/public/docker-compose-hubeau.yml
:::

::: tip
You should activate the built-in Hub'Eau layers like `HUBEAU_HYDRO` in Kano using the `LAYERS_FILTER` environment variable.
:::

## From source code

First you have to ensure the [KDK prerequisites](https://kalisio.github.io/kdk/guides/development/setup.html#prerequisites) to run Kano from source code.

::: warning
At the time of writing Kano v2.x (`master` branch) is expected to work with KDK modules v2.x (`master` branch and Node.js 16.x) and Kano v1.x (`test` branches) is expected to work with KDK modules v1.x (Node.js 12.x)
:::

Then the following commands, assuming you have a MongoDB instance running on local host and default port (27017), should launch your local instance of Kano:

```bash
// Clone KDK
git clone https://github.com/kalisio/kdk.git
cd kdk
yarn install
yarn link

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

### Add weather forecasts

Instead of using Docker containers you can directly install Weacast from the source code as well by following [this guide](https://weacast.github.io/weacast/guides/basics.html#the-hard-way-from-source-code). You should however take care of port conflicts as it uses the same than Kano by default (API and NodeJS debugger), the following commands should do the job:
```bash
// Clone Weacast
git clone https://github.com/weacast/weacast.git
cd weacast
yarn install

// Set the most minimalist environment to run server
export PORT="8082"
export NODE_OPTIONS="--inspect-port=9230"
export LOADERS="gfs"

// Run the server/API
cd packages/api
yarn dev
```

::: tip
You should activate the built-in Weacast layers like `WIND_TILED` in Kano using the `LAYERS_FILTER` environment variable.
:::

### Add krawler jobs

Instead of using Docker containers you can directly install Krawler from the source code as well by following [this guide](https://kalisio.github.io/krawler/guides/installing-krawler.html) and retrieve/run required jobs manually, it's notably useful when developing new jobs:
```bash
git clone https://github.com/kalisio/krawler
cd krawler
yarn install
yarn link
// Now you can proceed with your jobs
git clone https://github.com/kalisio/k-hubeau
yarn install
yarn link @kalisio/krawler
// Set the most minimalist environment to run the jobs
export DB_URL=mongodb://mongodb:27017/kano
// Now you can launch the jobs manually using the krawler CLI
krawler ./jobfile-hydro-stations.js
krawler ./jobfile-hydro-observations.js
```

## Using Minikube

::: warning 
This requires you to install [Minikube](https://minikube.sigs.k8s.io/docs/), a popular implementation of local K8s cluster. 
The Kubernetes packet manager [Helm](https://helm.sh/) is also required.
::: 

  * This tutorial use a docker image from the [Docker Hub](https://hub.docker.com/r/kalisio/kano/). Kalisio also provides a helm char for Kano, hosted
in the [Kargo repository](https://github.com/kalisio/kargo), a collection of charts written by Kalisio.
  * Kano requires the [Mongodb](https://www.mongodb.com/) database. MongoDB will be installed with the famous charts collection from
   [Bitnami](https://github.com/bitnami/charts).

The installation described here contains a **minimalist set of configuration files** to run Kano. These files will be detailed in the following sections and are available in the [public folder](https://github.com/kalisio/kano/tree/master/docs/.vitepress/public) of the documentation.

All the files needed from installation are available in [public folder/minikube](https://github.com/kalisio/kano/tree/master/docs/.vitepress/public/minikube).
All the resources will be created in a `tutorial` namespace of your Kubernetes cluster.

The Kano chart reads values like database Url connexion from Kubernetes secrets. So the first step is to create the secrets. After that we install the MongoDb and Kano chart.
Run the following commands to perform the required actions:

```bash
kubectl create namespace tutorial
kubectl -n tutorial create secret generic kano \
    --from-literal=db-url='mongodb://kano:kano@mongodb/kano' \
    --from-literal=data-db-url='mongodb://kano:kano@mongodb/kano' \
    --from-literal=app-secret='MySecret!' \
    --from-literal=cesium-token='' \
    --from-literal=mapillary-token=''
helm -n tutorial install \
    --version 15.1.1 \
    --set useStatefulSet=true \
    --set 'auth.rootPassword=R33T!,auth.usernames={kano}' \
    --set 'auth.passwords={kano},auth.databases={kano}' \
    mongodb  oci://registry-1.docker.io/bitnamicharts/mongodb
kubectl create -n tutorial configmap kano-config \
    --from-file=local.cjs=./docs/.vitepress/public/local-kano.cjs \
    --from-file=my-layers.cjs=./docs/.vitepress/public/my-layers.cjs
helm -n tutorial install -f docs/.vitepress/public/kano.yaml kano  oci://harbor.portal.kalisio.com/kalisio/helm/kano
```

To access to Kano, we are asking Minikube to open a web brower on the Kano URL:
```bash
minikube -n tutorial service kano
```

You should see something like this once connected:

![installation](../.vitepress/public/images/kano-installation.png)

::: tip
Check the `local.cjs` configuration file below to find the required login information
:::

::: warning
To simplify the tutorial we do not configure the ingress ressources of Minikube.
:::

::: details kano.yaml - Provided values to configure the Kano helm chart.
<<< ../.vitepress/public/kano.yaml
:::

Kano comes with a default set of users but you should change this default configuration for a public deployment to avoid leaking login/passwords. Similarly, Kano comes with a default set of layers targeting geospatial services deployed by [Kargo](https://kalisio.github.io/kargo/) and you should add your own data layers instead. This is done by configuration using the following files:

::: details local.cjs - Used to override the default backend configuration and setup a default user.
To be put in the `kano/api/config` directory.

<<< ../.vitepress/public/local-kano.cjs
:::
::: details my-layers.cjs - Used to define the available default layers.
To be put in the `kano/api/config/layers` directory. Example based on OpenStreeetMap [tile servers](https://wiki.openstreetmap.org/wiki/Tile_servers) and [IGN web services](https://geoservices.ign.fr/services-web-experts-cartes).

<<< ../.vitepress/public/my-layers.cjs
:::

As detailed in the [KDK documentation](https://kalisio.github.io/kdk/guides/development/deploy.html#deployment-flavors) Kano comes into three different flavors. By default the helm chart targets the latest preproduction version (`test` tag) but you can change it to target either a development (`dev` tag) or a production (`prod` tag) release using the command line switch `--set image.tag=prod`.

::: warning
By default no built-in layers are available in Kano unless you specify their names using the `LAYERS_FILTER` environment variable. By defining `LAYERS_FILTER=*` you will get all built-in layers but take care that a lot of them requires additional services to work correctly (read following sections below). You can however directly add new layers using the Kano GUI (through the add layer button or by drag'n'drop on the map).
:::

::: tip
If you'd like to use the 3D mode or the Mapillary layer you should provide the required tokens to access their respective APIs on the backend side by setting the following environment variables: `CESIUM_TOKEN`, `MAPILLARY_TOKEN`.
:::

To uninstall the Kano environment:
```shell
kubectl delete all --all -n tutorial
kubectl delete namespace tutorial

```

::: warning
Please note that it will not delete the associate PVC. If you want to remove it, use `kubectl delete pvc <the_PVC_of_mongoDB_in_tutorial>`.
:::
