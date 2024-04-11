import{_ as a,c as n,o as i,V as e}from"./chunks/framework.J61Sinzt.js";const s="/kano/assets/kano-installation.opRySSk9.png",l="/kano/assets/weacast-installation.eFFnGIQX.png",p="/kano/assets/hubeau-installation.AH39zNjO.png",u=JSON.parse('{"title":"Installing Kano","description":"","frontmatter":{"sidebarDepth":3},"headers":[],"relativePath":"guides/installing-kano.md","filePath":"guides/installing-kano.md"}'),t={name:"guides/installing-kano.md"},h=e(`<h1 id="installing-kano" tabindex="-1">Installing Kano <a class="header-anchor" href="#installing-kano" aria-label="Permalink to &quot;Installing Kano&quot;">​</a></h1><h2 id="using-docker" tabindex="-1">Using Docker <a class="header-anchor" href="#using-docker" aria-label="Permalink to &quot;Using Docker&quot;">​</a></h2><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>This requires you to <a href="https://docs.docker.com/engine/installation/" target="_blank" rel="noreferrer">install Docker</a>, the world’s leading software container platform.</p></div><p>We provide Docker images on the <a href="https://hub.docker.com/r/kalisio/kano/" target="_blank" rel="noreferrer">Docker Hub</a> to ease deploying your own instance. To run correctly it has to be linked with a standard <a href="https://hub.docker.com/_/mongo/" target="_blank" rel="noreferrer">MongoDB container</a> for the database. Although it&#39;s possible to directly run Docker commands we provide you with <a href="https://docs.docker.com/compose/" target="_blank" rel="noreferrer">docker-compose</a> files to ease deployment, in addition to minimalist configuration files. These files will be detailed in the following sections and are available in the <a href="https://github.com/kalisio/kano/tree/master/docs/.vitepress/public" target="_blank" rel="noreferrer">public folder</a> of the documentation.</p><p>Once you have retrieved the required docker-compose and configuration files, jump into the folder with the docker-compose and configuration files, the following commands should do the job:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">//</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Run the MongoDB and Kano containers</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker-compose</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> up -d</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">//</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Stop the MongoDB and Kano containers</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker-compose</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> down</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">//</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Stop the MongoDB and Kano containers erasing DB data</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker-compose</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> down -v</span></span></code></pre></div><p>Then point your browser to <a href="http://localhost:8080" target="_blank" rel="noreferrer">localhost:8080</a>. You should see something like this once connected:</p><p><img src="`+s+`" alt="installation"></p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>Check the <code>local.cjs</code> configuration file below to find the required login information</p></div><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>If running Docker under Windows in a virtual machine first redirect the port 8080 of your virtual machine to your host</p></div><details class="details custom-block"><summary>docker-compose.yml - Used to deploy MongoDB and Kano containers.</summary><div class="language-yml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yml</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;3.3&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">services</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  kano</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    image</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">kalisio/kano:dev</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    environment</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">APP_SECRET=xxx</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">LAYERS_FILTER=OSM PLAN_IGN CESIUM_ELLIPSOID</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">BUILD_NUMBER</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">NODE_APP_INSTANCE</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">DB_URL=mongodb://mongodb:27017/kano</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">DATA_DB_URL</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">CESIUM_TOKEN=xxx</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">MAPILLARY_TOKEN=xxx</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    volumes</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">bind</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        source</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">./my-layers.cjs</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        target</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/opt/kalisio/kano/api/config/layers/my-layers.cjs</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">bind</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        source</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">./local-kano.cjs</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        target</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/opt/kalisio/kano/api/config/local.cjs</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    ports</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;8080:8081&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    networks</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">kano</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  mongodb</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    image</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">mongo:4.2</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    volumes</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">mongodb:/data/db</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    ports</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;27017:27017&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    networks</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">kano</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">volumes</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  mongodb</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">networks</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  kano</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span></code></pre></div></details><p>Kano comes with a default set of users but you should change this default configuration for a public deployment and avoid leaking login/passwords. Similarly, Kano comes with a default set of layers targeting geospatial services deployed by <a href="https://kalisio.github.io/kargo/" target="_blank" rel="noreferrer">Kargo</a> and you should add your own data layers instead. This is done by configuration using the following files:</p><details class="details custom-block"><summary>local.cjs - Used to override the default backend configuration and setup a default user.</summary><p>To be put in the <code>kano/api/config</code> directory.</p><div class="language-cjs vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cjs</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>module.exports = {</span></span>
<span class="line"><span>  authentication: {</span></span>
<span class="line"><span>    defaultUsers: [</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        email: process.env.DEFAULT_USER_EMAIL || &#39;john.doe@gmail.com&#39;,</span></span>
<span class="line"><span>        password: process.env.DEFAULT_USER_PASSWORD || &#39;John;Doe1&#39;,</span></span>
<span class="line"><span>        name: &#39;John Doe&#39;,</span></span>
<span class="line"><span>        catalog: { permissions: &#39;owner&#39; }, // Grant admin rights to update catalog</span></span>
<span class="line"><span>        layers: [{ // Grant admin rights to update layer data</span></span>
<span class="line"><span>          name: &#39;Layers.SENSORS&#39;,</span></span>
<span class="line"><span>          permissions: &#39;manager&#39;,</span></span>
<span class="line"><span>          probeService: &#39;sensors-stations&#39;,</span></span>
<span class="line"><span>          service: &#39;sensors-observations&#39;</span></span>
<span class="line"><span>        }]</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    ]</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div></details><details class="details custom-block"><summary>my-layers.cjs - Used to define the available default layers.</summary><p>To be put in the <code>kano/api/config/layers</code> directory. Example based on OpenStreeetMap <a href="https://wiki.openstreetmap.org/wiki/Tile_servers" target="_blank" rel="noreferrer">tile servers</a> and <a href="https://geoservices.ign.fr/services-web-experts-cartes" target="_blank" rel="noreferrer">IGN web services</a>.</p><div class="language-cjs vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cjs</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>module.exports = [{</span></span>
<span class="line"><span>    name: &#39;Layers.OSM&#39;,</span></span>
<span class="line"><span>    description: &#39;Layers.OSM_DESCRIPTION&#39;,</span></span>
<span class="line"><span>    i18n: {</span></span>
<span class="line"><span>      fr: {</span></span>
<span class="line"><span>        Layers: {</span></span>
<span class="line"><span>          OSM: &#39;OSM&#39;,</span></span>
<span class="line"><span>          OSM_DESCRIPTION: &#39;Données OpenStreetMap&#39;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      en: {</span></span>
<span class="line"><span>        Layers: {</span></span>
<span class="line"><span>          OSM: &#39;OSM&#39;,</span></span>
<span class="line"><span>          OSM_DESCRIPTION: &#39;OpenStreeMap data&#39;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    tags: [</span></span>
<span class="line"><span>      &#39;street&#39;</span></span>
<span class="line"><span>    ],</span></span>
<span class="line"><span>    iconUrl: \`http://a.tile.osm.org/0/0/0.png\`,</span></span>
<span class="line"><span>    icon: &#39;streetview&#39;,</span></span>
<span class="line"><span>    attribution: &#39;OpenStreetMap © &lt;a href=&quot;http://openstreetmap.org&quot;&gt;OpenStreetMap&lt;/a&gt; contributors&#39;,</span></span>
<span class="line"><span>    type: &#39;BaseLayer&#39;,</span></span>
<span class="line"><span>    leaflet: {</span></span>
<span class="line"><span>      type: &#39;tileLayer&#39;,</span></span>
<span class="line"><span>      isVisible: true,</span></span>
<span class="line"><span>      source: &#39;http://{s}.tile.osm.org/{z}/{x}/{y}.png&#39;,</span></span>
<span class="line"><span>      maxZoom: 21,</span></span>
<span class="line"><span>      maxNativeZoom: 18</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    cesium: {</span></span>
<span class="line"><span>      type: &#39;OpenStreetMap&#39;,</span></span>
<span class="line"><span>      url: \`http://a.tile.osm.org\`</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    name: &#39;Layers.PLAN_IGN&#39;,</span></span>
<span class="line"><span>    description: &#39;Layers.PLAN_IGN_DESCRIPTION&#39;,</span></span>
<span class="line"><span>    i18n: {</span></span>
<span class="line"><span>      fr: {</span></span>
<span class="line"><span>        Layers: {</span></span>
<span class="line"><span>          PLAN_IGN: &#39;Plan IGN&#39;,</span></span>
<span class="line"><span>          PLAN_IGN_DESCRIPTION: &#39;Plan IGN v2&#39;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      en: {</span></span>
<span class="line"><span>        Layers: {</span></span>
<span class="line"><span>          PLAN_IGN: &#39;Plan IGN&#39;,</span></span>
<span class="line"><span>          PLAN_IGN_DESCRIPTION: &#39;Plan IGN v2&#39;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    tags: [</span></span>
<span class="line"><span>      &#39;street&#39;</span></span>
<span class="line"><span>    ],</span></span>
<span class="line"><span>    type: &#39;BaseLayer&#39;,</span></span>
<span class="line"><span>    iconUrl: &#39;https://data.geopf.fr/wmts?SERVICE=WMTS&amp;REQUEST=GetTile&amp;VERSION=1.0.0&amp;LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&amp;STYLE=normal&amp;FORMAT=image/png&amp;TILEMATRIXSET=PM&amp;TILEMATRIX=8&amp;TILEROW=92&amp;TILECOL=132&#39;,</span></span>
<span class="line"><span>    icon: &#39;las la-plug&#39;,</span></span>
<span class="line"><span>    attribution: &#39;&lt;a href=&quot;https://www.ign.fr/&quot;&gt;IGN&lt;/a&gt;&#39;,</span></span>
<span class="line"><span>    cesium: {</span></span>
<span class="line"><span>      type: &#39;WebMapTileService&#39;,</span></span>
<span class="line"><span>      url: &#39;https://data.geopf.fr/wmts?SERVICE=WMTS&amp;REQUEST=GetTile&amp;VERSION=1.0.0&amp;LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&amp;STYLE=normal&amp;FORMAT=image/png&amp;TILEMATRIXSET=PM&amp;TILEMATRIX={TileMatrix}&amp;TILEROW={TileRow}&amp;TILECOL={TileCol}&#39;,</span></span>
<span class="line"><span>      format: &#39;image/png&#39;,</span></span>
<span class="line"><span>      layer: &#39;GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&#39;,</span></span>
<span class="line"><span>      style: &#39;normal&#39;,</span></span>
<span class="line"><span>      tileMatrixSetID: &#39;PM&#39;</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    leaflet: {</span></span>
<span class="line"><span>      type: &#39;tileLayer&#39;,</span></span>
<span class="line"><span>      source: &#39;https://data.geopf.fr/wmts?SERVICE=WMTS&amp;REQUEST=GetTile&amp;VERSION=1.0.0&amp;LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&amp;STYLE=normal&amp;FORMAT=image/png&amp;TILEMATRIXSET=PM&amp;TILEMATRIX={z}&amp;TILEROW={y}&amp;TILECOL={x}&#39;,</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>]</span></span></code></pre></div></details><p>As detailed in the <a href="https://kalisio.github.io/kdk/guides/development/deploy.html#deployment-flavors" target="_blank" rel="noreferrer">KDK documentation</a> Kano comes into three different flavors. By default the docker-compose file targets the latest development version (<code>dev</code> tag) but you can change it to target either a beta (<code>test</code> tag) or a production (<code>prod</code> tag) release.</p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>By default no built-in layers are available in Kano unless you specify their names using the <code>LAYERS_FILTER</code> environment variable. By defining <code>LAYERS_FILTER=*</code> you will get all built-in layers but take care that a lot of them requires additional services to work correctly (read following sections below). You can however directly add new layers using the Kano GUI (through the add layer button or by drag&#39;n&#39;drop on the map).</p></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>If you&#39;d like to use the 3D mode or the Mapillary layer you should provide the required tokens to access their respective APIs on the backend side by setting the following environment variables: <code>CESIUM_TOKEN</code>, <code>MAPILLARY_TOKEN</code>.</p></div><h3 id="add-weather-forecasts" tabindex="-1">Add weather forecasts <a class="header-anchor" href="#add-weather-forecasts" aria-label="Permalink to &quot;Add weather forecasts&quot;">​</a></h3><p>Kano integrates smoothly with <a href="https://weacast.github.io/weacast/" target="_blank" rel="noreferrer">Weacast</a> in order to display weather forecast data. You can also use Docker containers to run Weacast by following <a href="https://weacast.github.io/weacast/guides/basics.html#the-easy-way-using-docker" target="_blank" rel="noreferrer">this guide</a> and taking care of port conflicts as they use the same by default.</p><p>The following commands and additional docker-compose file should do the job:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">//</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Run the MongoDB, Weacast and Kano containers</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker-compose</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -f</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docker-compose.yml -f docker-compose-weacast.yml up -d</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">//</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Stop the MongoDB, Weacast and Kano containers</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker-compose</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -f</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docker-compose.yml -f docker-compose-weacast.yml down </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">//</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Stop the MongoDB, Weacast and Kano containers erasing DB data</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker-compose</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -f</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docker-compose.yml -f docker-compose-weacast.yml down -v</span></span></code></pre></div><p>Wait a couple of minutes so that Weacast feeds the database with the latest forecast then point your browser to <a href="http://localhost:8080" target="_blank" rel="noreferrer">localhost:8080</a>. You should see something like this once connected if you display some meteorological layers and probe a location:</p><p><img src="`+l+`" alt="installation"></p><details class="details custom-block"><summary>docker-compose-weacast.yml - Used to deploy Weacast container.</summary><div class="language-yml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yml</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;3.3&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">services</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  kano</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    environment</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">LAYERS_FILTER=OSM PLAN_IGN WIND_TILED GUST_TILED PRECIPITATIONS_TILED TEMPERATURE_TILED CESIUM_ELLIPSOID</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  weacast</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    image</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">weacast/weacast-api:dev</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    environment</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">APP_SECRET=yyy</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">DB_URL=mongodb://mongodb:27017/weacast</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">LOADERS=gfs</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">LOG_LEVEL</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">DEBUG</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    ports</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;8081:8081&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    networks</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">kano</span></span></code></pre></div></details><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>You should activate the built-in Weacast layers like <code>WIND_TILED</code> in Kano using the <code>LAYERS_FILTER</code> environment variable.</p></div><h3 id="add-krawler-jobs" tabindex="-1">Add krawler jobs <a class="header-anchor" href="#add-krawler-jobs" aria-label="Permalink to &quot;Add krawler jobs&quot;">​</a></h3><p>Kano integrates smoothly with <a href="https://kalisio.github.io/krawler" target="_blank" rel="noreferrer">Krawler jobs</a> in order to feed data for near real-time measurements/observations layers. A lot of built-in layers requires the associated job(s) to be deployed beside Kano. You can search for available jobs in our <a href="https://github.com/orgs/kalisio/repositories?language=&amp;q=krawler&amp;sort=&amp;type=all" target="_blank" rel="noreferrer">GitHub organisation</a> and find more information about available layers in the <a href="https://crisis.com/gofurther/catalog.html" target="_blank" rel="noreferrer">Kalisio Crisis catalog</a>.</p><p>For the purpose of this documentation we will focus on the <a href="https://github.com/kalisio/k-hubeau" target="_blank" rel="noreferrer">k-hubeau</a> hydro jobs but others jobs work similarly. The following commands and additional docker-compose file should do the job:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">//</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Run the MongoDB, Hubeau jobs and Kano containers</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker-compose</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -f</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docker-compose.yml -f docker-compose-hubeau.yml up -d</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">//</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Stop the MongoDB, Hubeau jobs and Kano containers</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker-compose</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -f</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docker-compose.yml -f docker-compose-hubeau.yml down </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">//</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Stop the MongoDB, Hubeau jobs and Kano containers erasing DB data</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker-compose</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -f</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docker-compose.yml -f docker-compose-hubeau.yml down -v</span></span></code></pre></div><p>Wait a couple of minutes so that the jobs feeds the database with the latest observations then point your browser to <a href="http://localhost:8080" target="_blank" rel="noreferrer">localhost:8080</a>. You should see something like this once connected if you display the observations layer, zoom in and pick a station:</p><p><img src="`+p+`" alt="installation"></p><details class="details custom-block"><summary>docker-compose-hubeau.yml - Used to deploy Hubeau jobs containers.</summary><div class="language-yml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yml</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;3.3&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">services</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  kano</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    environment</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">LAYERS_FILTER=OSM PLAN_IGN HUBEAU_HYDRO</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  hubeau-stations</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    image</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">kalisio/k-hubeau:hydro-stations-latest</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    environment</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">DB_URL=mongodb://mongodb:27017/kano</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">DEBUG</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    networks</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">kano</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  hubeau-observations</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    image</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">kalisio/k-hubeau:hydro-observations-latest</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    environment</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">DB_URL=mongodb://mongodb:27017/kano</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">DEBUG</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    depends_on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      hubeau-stations</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        condition</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">service_healthy</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    networks</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">kano</span></span></code></pre></div></details><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>You should activate the built-in Hub&#39;Eau layers like <code>HUBEAU_HYDRO</code> in Kano using the <code>LAYERS_FILTER</code> environment variable.</p></div><h2 id="from-source-code" tabindex="-1">From source code <a class="header-anchor" href="#from-source-code" aria-label="Permalink to &quot;From source code&quot;">​</a></h2><p>First you have to ensure the <a href="https://kalisio.github.io/kdk/guides/development/setup.html#prerequisites" target="_blank" rel="noreferrer">KDK prerequisites</a> to run Kano from source code.</p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>At the time of writing Kano v2.x (<code>master</code> branch) is expected to work with KDK modules v2.x (<code>master</code> branch and Node.js 16.x) and Kano v1.x (<code>test</code> branches) is expected to work with KDK modules v1.x (Node.js 12.x)</p></div><p>Then the following commands, assuming you have a MongoDB instance running on local host and default port (27017), should launch your local instance of Kano:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">//</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Clone KDK</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> clone https://github.com/kalisio/kdk.git</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> kdk</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yarn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yarn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> link</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">//</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> In another terminal clone Kano</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> clone https://github.com/kalisio/kano.git</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">//</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Set the most minimalist environment to run server</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> APP_SECRET</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;xxx&quot;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> LAYERS_FILTER</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;OSM PLAN_IGN CESIUM_ELLIPSOID&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">//</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Run the server/API</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> kano/api</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">//</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Copy custom configuration files</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> local.js config</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> my-layers.js config/layers</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yarn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yarn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> link @kalisio/kdk</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yarn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dev</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">//</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> In another terminal run the client app</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> kano</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yarn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yarn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> link @kalisio/kdk</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yarn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dev</span></span></code></pre></div><p>Point your browser to <a href="http://localhost:8080" target="_blank" rel="noreferrer">localhost:8080</a>.</p><h3 id="add-weather-forecasts-1" tabindex="-1">Add weather forecasts <a class="header-anchor" href="#add-weather-forecasts-1" aria-label="Permalink to &quot;Add weather forecasts&quot;">​</a></h3><p>Instead of using Docker containers you can directly install Weacast from the source code as well by following <a href="https://weacast.github.io/weacast/guides/basics.html#the-hard-way-from-source-code" target="_blank" rel="noreferrer">this guide</a>. You should however take care of port conflicts as it uses the same than Kano by default (API and NodeJS debugger), the following commands should do the job:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">//</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Clone Weacast</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> clone https://github.com/weacast/weacast.git</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> weacast</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yarn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">//</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Set the most minimalist environment to run server</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> PORT</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;8082&quot;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> NODE_OPTIONS</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;--inspect-port=9230&quot;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> LOADERS</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;gfs&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">//</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Run the server/API</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> packages/api</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yarn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dev</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>You should activate the built-in Weacast layers like <code>WIND_TILED</code> in Kano using the <code>LAYERS_FILTER</code> environment variable.</p></div><h3 id="add-krawler-jobs-1" tabindex="-1">Add krawler jobs <a class="header-anchor" href="#add-krawler-jobs-1" aria-label="Permalink to &quot;Add krawler jobs&quot;">​</a></h3><p>Instead of using Docker containers you can directly install Krawler from the source code as well by following <a href="https://kalisio.github.io/krawler/guides/installing-krawler.html" target="_blank" rel="noreferrer">this guide</a> and retrieve/run required jobs manually, it&#39;s notably useful when developing new jobs:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> clone https://github.com/kalisio/krawler</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> krawler</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yarn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yarn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> link</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">//</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Now you can proceed with your jobs</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> clone https://github.com/kalisio/k-hubeau</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yarn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yarn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> link @kalisio/krawler</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">//</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Set the most minimalist environment to run the jobs</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> DB_URL</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">mongodb://mongodb:27017/kano</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">//</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Now you can launch the jobs manually using the krawler CLI</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">krawler</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ./jobfile-hydro-stations.js</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">krawler</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ./jobfile-hydro-observations.js</span></span></code></pre></div><h2 id="using-minikube" tabindex="-1">Using Minikube <a class="header-anchor" href="#using-minikube" aria-label="Permalink to &quot;Using Minikube&quot;">​</a></h2><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>This requires you to install <a href="https://minikube.sigs.k8s.io/docs/" target="_blank" rel="noreferrer">Minikube</a>, a popular implementation of local K8s cluster. The Kubernetes packet manager <a href="https://helm.sh/" target="_blank" rel="noreferrer">Helm</a> is also required.</p></div><ul><li>This tutorial use a docker image from the <a href="https://hub.docker.com/r/kalisio/kano/" target="_blank" rel="noreferrer">Docker Hub</a>. Kalisio also provides a helm char for Kano, hosted in the <a href="https://github.com/kalisio/kargo" target="_blank" rel="noreferrer">Kargo repository</a>, a collection of charts written by Kalisio.</li><li>Kano requires the <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer">Mongodb</a> database. MongoDB will be installed with the famous charts collection from <a href="https://github.com/bitnami/charts" target="_blank" rel="noreferrer">Bitnami</a>.</li></ul><p>The installation described here contains a <strong>minimalist set of configuration files</strong> to run Kano. These files will be detailed in the following sections and are available in the <a href="https://github.com/kalisio/kano/tree/master/docs/.vitepress/public" target="_blank" rel="noreferrer">public folder</a> of the documentation.</p><p>All the files needed from installation are available in <a href="https://github.com/kalisio/kano/tree/master/docs/.vitepress/public/minikube" target="_blank" rel="noreferrer">public folder/minikube</a>. All the resources will be created in a <code>tutorial</code> namespace of your Kubernetes cluster.</p><p>The Kano chart reads values like database Url connexion from Kubernetes secrets. So the first step is to create the secrets. After that we install the MongoDb and Kano chart. Run the following commands to perform the required actions:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">kubectl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> create namespace tutorial</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">kubectl</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -n</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> tutorial create secret generic kano </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    --from-literal=db-url=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;mongodb://kano:kano@mongodb/kano&#39;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    --from-literal=data-db-url=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;mongodb://kano:kano@mongodb/kano&#39;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    --from-literal=app-secret=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;MySecret!&#39;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    --from-literal=cesium-token=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;&#39;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    --from-literal=mapillary-token=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;&#39;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">helm</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -n</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> tutorial install </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    --version</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 15.1</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.1 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    --set</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> useStatefulSet=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    --set</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;auth.rootPassword=R33T!,auth.usernames={kano}&#39;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    --set</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;auth.passwords={kano},auth.databases={kano}&#39;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    mongodb  oci://registry-1.docker.io/bitnamicharts/mongodb</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">kubectl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> create -n tutorial configmap kano-config </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    --from-file=local.cjs=./docs/.vitepress/public/local-kano.cjs</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    --from-file=my-layers.cjs=./docs/.vitepress/public/my-layers.cjs</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">helm</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -n</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> tutorial install -f docs/.vitepress/public/kano.yaml kano  oci://harbor.portal.kalisio.com/kalisio/helm/kano</span></span></code></pre></div><p>To access to Kano, we are asking Minikube to open a web brower on the Kano URL:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">minikube</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -n</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> tutorial service kano</span></span></code></pre></div><p>You should see something like this once connected:</p><p><img src="`+s+`" alt="installation"></p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>Check the <code>local.cjs</code> configuration file below to find the required login information</p></div><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>To simplify the tutorial we do not configure the ingress ressources of Minikube.</p></div><details class="details custom-block"><summary>kano.yaml - Provided values to configure the Kano helm chart.</summary><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#############################################################################</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Kano chart values for the Kano tutoriel</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># cf. https://kalisio.github.io/kano/guides/installing-kano.html</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># minimum configuration to run Kano</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#############################################################################</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">global</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # subdomain to be used when computing the ingress host</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  subdomain</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # certIssuer to assign to the ingress cert-manager annotation</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  certIssuer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # secret where to share sentitive environment variables</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  secret</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># commonAnnotations are annotations to be added to all resources (sub-charts are not considered). Evaluated as a template</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">commonAnnotations</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># commoneLabels are labels to be added to all resources (sub-charts are not considered). Evaluated as a template</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">commonLabel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># replicatCount is the number of replicas</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">replicaCount</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">image</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  repository</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">kalisio/kano</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  tag</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;test&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  pullPolicy</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">IfNotPresent</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># expose the service on a node port 8081</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">service</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  enabled</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">NodePort</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  port</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">8081</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                                                           </span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  annotations</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ingress</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  enabled</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">distribution</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # not external services as consumer for this tutorial</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  enabled</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">env</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # appId specifies the application id for the API gateway if used</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  appId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;myId&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # String to define the layers to be integrated into the catalog</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  layersFilter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;*&quot;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # logLevel specifies the level of frontend log</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  logLevel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # debug specified the list of backend modules for which the debug output is enabled</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  debug</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># resources are resource requests and limits to be applied</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">resources</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># default security context, run as non root uid 1000</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">podSecurityContext</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  runAsNonRoot</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  runAsUser</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1000</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># override the configuration of Kano with config map</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">additionalConfig</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  configMap</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;kano-config&#39;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  fileMapping</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    local.cjs</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/opt/kalisio/kano/api/config/local.cjs</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    my-layers.cjs</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/opt/kalisio/kano/api/config/layers/my-layers.cjs</span></span></code></pre></div></details><p>Kano comes with a default set of users but you should change this default configuration for a public deployment to avoid leaking login/passwords. Similarly, Kano comes with a default set of layers targeting geospatial services deployed by <a href="https://kalisio.github.io/kargo/" target="_blank" rel="noreferrer">Kargo</a> and you should add your own data layers instead. This is done by configuration using the following files:</p><details class="details custom-block"><summary>local.cjs - Used to override the default backend configuration and setup a default user.</summary><p>To be put in the <code>kano/api/config</code> directory.</p><div class="language-cjs vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cjs</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>module.exports = {</span></span>
<span class="line"><span>  authentication: {</span></span>
<span class="line"><span>    defaultUsers: [</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        email: process.env.DEFAULT_USER_EMAIL || &#39;john.doe@gmail.com&#39;,</span></span>
<span class="line"><span>        password: process.env.DEFAULT_USER_PASSWORD || &#39;John;Doe1&#39;,</span></span>
<span class="line"><span>        name: &#39;John Doe&#39;,</span></span>
<span class="line"><span>        catalog: { permissions: &#39;owner&#39; }, // Grant admin rights to update catalog</span></span>
<span class="line"><span>        layers: [{ // Grant admin rights to update layer data</span></span>
<span class="line"><span>          name: &#39;Layers.SENSORS&#39;,</span></span>
<span class="line"><span>          permissions: &#39;manager&#39;,</span></span>
<span class="line"><span>          probeService: &#39;sensors-stations&#39;,</span></span>
<span class="line"><span>          service: &#39;sensors-observations&#39;</span></span>
<span class="line"><span>        }]</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    ]</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div></details><details class="details custom-block"><summary>my-layers.cjs - Used to define the available default layers.</summary><p>To be put in the <code>kano/api/config/layers</code> directory. Example based on OpenStreeetMap <a href="https://wiki.openstreetmap.org/wiki/Tile_servers" target="_blank" rel="noreferrer">tile servers</a> and <a href="https://geoservices.ign.fr/services-web-experts-cartes" target="_blank" rel="noreferrer">IGN web services</a>.</p><div class="language-cjs vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cjs</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>module.exports = [{</span></span>
<span class="line"><span>    name: &#39;Layers.OSM&#39;,</span></span>
<span class="line"><span>    description: &#39;Layers.OSM_DESCRIPTION&#39;,</span></span>
<span class="line"><span>    i18n: {</span></span>
<span class="line"><span>      fr: {</span></span>
<span class="line"><span>        Layers: {</span></span>
<span class="line"><span>          OSM: &#39;OSM&#39;,</span></span>
<span class="line"><span>          OSM_DESCRIPTION: &#39;Données OpenStreetMap&#39;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      en: {</span></span>
<span class="line"><span>        Layers: {</span></span>
<span class="line"><span>          OSM: &#39;OSM&#39;,</span></span>
<span class="line"><span>          OSM_DESCRIPTION: &#39;OpenStreeMap data&#39;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    tags: [</span></span>
<span class="line"><span>      &#39;street&#39;</span></span>
<span class="line"><span>    ],</span></span>
<span class="line"><span>    iconUrl: \`http://a.tile.osm.org/0/0/0.png\`,</span></span>
<span class="line"><span>    icon: &#39;streetview&#39;,</span></span>
<span class="line"><span>    attribution: &#39;OpenStreetMap © &lt;a href=&quot;http://openstreetmap.org&quot;&gt;OpenStreetMap&lt;/a&gt; contributors&#39;,</span></span>
<span class="line"><span>    type: &#39;BaseLayer&#39;,</span></span>
<span class="line"><span>    leaflet: {</span></span>
<span class="line"><span>      type: &#39;tileLayer&#39;,</span></span>
<span class="line"><span>      isVisible: true,</span></span>
<span class="line"><span>      source: &#39;http://{s}.tile.osm.org/{z}/{x}/{y}.png&#39;,</span></span>
<span class="line"><span>      maxZoom: 21,</span></span>
<span class="line"><span>      maxNativeZoom: 18</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    cesium: {</span></span>
<span class="line"><span>      type: &#39;OpenStreetMap&#39;,</span></span>
<span class="line"><span>      url: \`http://a.tile.osm.org\`</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    name: &#39;Layers.PLAN_IGN&#39;,</span></span>
<span class="line"><span>    description: &#39;Layers.PLAN_IGN_DESCRIPTION&#39;,</span></span>
<span class="line"><span>    i18n: {</span></span>
<span class="line"><span>      fr: {</span></span>
<span class="line"><span>        Layers: {</span></span>
<span class="line"><span>          PLAN_IGN: &#39;Plan IGN&#39;,</span></span>
<span class="line"><span>          PLAN_IGN_DESCRIPTION: &#39;Plan IGN v2&#39;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      en: {</span></span>
<span class="line"><span>        Layers: {</span></span>
<span class="line"><span>          PLAN_IGN: &#39;Plan IGN&#39;,</span></span>
<span class="line"><span>          PLAN_IGN_DESCRIPTION: &#39;Plan IGN v2&#39;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    tags: [</span></span>
<span class="line"><span>      &#39;street&#39;</span></span>
<span class="line"><span>    ],</span></span>
<span class="line"><span>    type: &#39;BaseLayer&#39;,</span></span>
<span class="line"><span>    iconUrl: &#39;https://data.geopf.fr/wmts?SERVICE=WMTS&amp;REQUEST=GetTile&amp;VERSION=1.0.0&amp;LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&amp;STYLE=normal&amp;FORMAT=image/png&amp;TILEMATRIXSET=PM&amp;TILEMATRIX=8&amp;TILEROW=92&amp;TILECOL=132&#39;,</span></span>
<span class="line"><span>    icon: &#39;las la-plug&#39;,</span></span>
<span class="line"><span>    attribution: &#39;&lt;a href=&quot;https://www.ign.fr/&quot;&gt;IGN&lt;/a&gt;&#39;,</span></span>
<span class="line"><span>    cesium: {</span></span>
<span class="line"><span>      type: &#39;WebMapTileService&#39;,</span></span>
<span class="line"><span>      url: &#39;https://data.geopf.fr/wmts?SERVICE=WMTS&amp;REQUEST=GetTile&amp;VERSION=1.0.0&amp;LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&amp;STYLE=normal&amp;FORMAT=image/png&amp;TILEMATRIXSET=PM&amp;TILEMATRIX={TileMatrix}&amp;TILEROW={TileRow}&amp;TILECOL={TileCol}&#39;,</span></span>
<span class="line"><span>      format: &#39;image/png&#39;,</span></span>
<span class="line"><span>      layer: &#39;GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&#39;,</span></span>
<span class="line"><span>      style: &#39;normal&#39;,</span></span>
<span class="line"><span>      tileMatrixSetID: &#39;PM&#39;</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    leaflet: {</span></span>
<span class="line"><span>      type: &#39;tileLayer&#39;,</span></span>
<span class="line"><span>      source: &#39;https://data.geopf.fr/wmts?SERVICE=WMTS&amp;REQUEST=GetTile&amp;VERSION=1.0.0&amp;LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&amp;STYLE=normal&amp;FORMAT=image/png&amp;TILEMATRIXSET=PM&amp;TILEMATRIX={z}&amp;TILEROW={y}&amp;TILECOL={x}&#39;,</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>]</span></span></code></pre></div></details><p>As detailed in the <a href="https://kalisio.github.io/kdk/guides/development/deploy.html#deployment-flavors" target="_blank" rel="noreferrer">KDK documentation</a> Kano comes into three different flavors. By default the helm chart targets the latest preproduction version (<code>test</code> tag) but you can change it to target either a development (<code>dev</code> tag) or a production (<code>prod</code> tag) release using the command line switch <code>--set image.tag=prod</code>.</p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>By default no built-in layers are available in Kano unless you specify their names using the <code>LAYERS_FILTER</code> environment variable. By defining <code>LAYERS_FILTER=*</code> you will get all built-in layers but take care that a lot of them requires additional services to work correctly (read following sections below). You can however directly add new layers using the Kano GUI (through the add layer button or by drag&#39;n&#39;drop on the map).</p></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>If you&#39;d like to use the 3D mode or the Mapillary layer you should provide the required tokens to access their respective APIs on the backend side by setting the following environment variables: <code>CESIUM_TOKEN</code>, <code>MAPILLARY_TOKEN</code>.</p></div><p>To uninstall the Kano environment:</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">kubectl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> delete all --all -n tutorial</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">kubectl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> delete namespace tutorial</span></span></code></pre></div><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>Please note that it will not delete the associate PVC. If you want to remove it, use <code>kubectl delete pvc &lt;the_PVC_of_mongoDB_in_tutorial&gt;</code>.</p></div>`,69),k=[h];function o(r,c,d,g,E,y){return i(),n("div",null,k)}const m=a(t,[["render",o]]);export{u as __pageData,m as default};
