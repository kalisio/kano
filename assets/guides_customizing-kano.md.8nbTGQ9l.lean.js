import{_ as s,c as a,o as n,V as p}from"./chunks/framework.J61Sinzt.js";const e="/kano/assets/kano-ogc-layers.mPkXU--y.png",i="/kano/assets/kano-file-layers.VfIDpJM5.png",l="/kano/assets/kano-covid-19-layers.4K62qXY-.png",t="/kano/assets/kano-covid-19-layers-3D.AY8QJGYX.png",o="/kano/assets/kano-sensors-layers.1fWLR23M.png",b=JSON.parse('{"title":"Customizing Kano","description":"","frontmatter":{"sidebarDepth":3},"headers":[],"relativePath":"guides/customizing-kano.md","filePath":"guides/customizing-kano.md"}'),r={name:"guides/customizing-kano.md"},c=p(`<h1 id="customizing-kano" tabindex="-1">Customizing Kano <a class="header-anchor" href="#customizing-kano" aria-label="Permalink to &quot;Customizing Kano&quot;">​</a></h1><p>This section details different approaches to integrate your own data to your Kano instance. Although you can directly use the Kano UI to add your own data layers this section provide details to do this by configuration or programmatically. When added through the UI, the different layers will be visible in the <em>My data</em> tab of the <a href="./../guides/getting-started.html#catalog">catalog panel</a>, while the default built-in layers will appear in the <em>Catalog</em> tab of the <a href="./../guides/getting-started.html#catalog">catalog panel</a>. You can also manage the <strong>categories</strong> (i.e. catalog sections) hosting the layers from the UI or the configuration.</p><p>Although names and descriptions can be hard-coded in the target user language, Kano supports internationalization through a nested structure organized by locale like this:</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Categories.POPULATION_LAYERS&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  i18n</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    fr</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: { </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Categories</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: { </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">POPULATION_LAYERS</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Population&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> } },</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    en</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: { </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Categories</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: { </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">POPULATION_LAYERS</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Population&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> } },</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    ...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><blockquote><p>Note that the <code>name</code> property is used a unique identifier for categories and layers</p></blockquote><h2 id="customizing-the-catalog" tabindex="-1">Customizing the catalog <a class="header-anchor" href="#customizing-the-catalog" aria-label="Permalink to &quot;Customizing the catalog&quot;">​</a></h2><p>You can add your own categories in the catalog by defining it in additional files to be put in the <code>kano/api/config/categories</code> directory. Kano will glob all files within this directory and add categories accordingly, only matching by name those in the <code>CATEGORIES_FILTER</code> (comma-separated list of category names) environment variable, if any. Categories are simple objects with a name, a description and an icon from a standard icon set among <a href="https://fonts.google.com/icons?icon.set=Material+Icons" target="_blank" rel="noreferrer">Material Icons</a>, <a href="https://fontawesome.com/icons" target="_blank" rel="noreferrer">Font Awesome</a>, or <a href="https://icons8.com/line-awesome" target="_blank" rel="noreferrer">Line Awesome</a>.</p><details class="details custom-block"><summary>my-categories.cjs - Used to define additional categories.</summary><div class="language-cjs vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cjs</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>module.exports = [{</span></span>
<span class="line"><span>  name: &#39;Categories.OSM_LAYERS&#39;,</span></span>
<span class="line"><span>  i18n: {</span></span>
<span class="line"><span>    fr: {</span></span>
<span class="line"><span>      Categories: {</span></span>
<span class="line"><span>        OSM_LAYERS: &#39;OpenStreetMap&#39;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    en: {</span></span>
<span class="line"><span>      Categories: {</span></span>
<span class="line"><span>        OSM_LAYERS: &#39;OpenStreetMap&#39;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  icon: &#39;las la-map&#39;,</span></span>
<span class="line"><span>  options: { exclusive: true, filter: { type: &#39;BaseLayer&#39;, tags: { $in: [&#39;osm&#39;] } } }</span></span>
<span class="line"><span>}, {</span></span>
<span class="line"><span>  name: &#39;Categories.POPULATION_LAYERS&#39;,</span></span>
<span class="line"><span>  i18n: {</span></span>
<span class="line"><span>    fr: {</span></span>
<span class="line"><span>      Categories: {</span></span>
<span class="line"><span>        POPULATION_LAYERS: &#39;Population&#39;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    en: {</span></span>
<span class="line"><span>      Categories: {</span></span>
<span class="line"><span>        POPULATION_LAYERS: &#39;Population&#39;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  icon: &#39;las la-users&#39;,</span></span>
<span class="line"><span>  options: { exclusive: false, filter: { type: &#39;OverlayLayer&#39;, tags: { $in: [&#39;population&#39;] } } }</span></span>
<span class="line"><span>}]</span></span></code></pre></div></details><p>Layers that will be added in a given category depends on the <code>filter</code> property content, which defines a <a href="https://github.com/crcn/sift.js" target="_blank" rel="noreferrer">sift filter</a> applied to the layers list. Although any filter can be used, a <code>tags</code> property containing an array of relevent tags is often used by convention.</p><h2 id="customizing-the-catalog-data" tabindex="-1">Customizing the catalog data <a class="header-anchor" href="#customizing-the-catalog-data" aria-label="Permalink to &quot;Customizing the catalog data&quot;">​</a></h2><p>You can add your own layers in the catalog by defining it in additional files to be put in the <code>kano/api/config/layers</code> directory. Kano will glob all files within this directory and add layers accordingly, only matching by name those in the <code>LAYERS_FILTER</code> (comma-separated list of layer names) environment variable by default (set it to <code>*</code> to remove filtering). Layers are simple objects with a name, a description, a type, an attribution, and additional configuration options related to the underlying mapping engine: <a href="https://leafletjs.com/" target="_blank" rel="noreferrer">Leaflet</a> for 2D rendering and <a href="https://cesium.com/" target="_blank" rel="noreferrer">Cesium</a> for 3D rendering. More details about these options can be found in the documentation of the <a href="https://kalisio.github.io/kdk/api/map/" target="_blank" rel="noreferrer">KDK</a> powering Kano.</p><blockquote><p>Please refer to the built-in <code>kano/api/config/layers</code> directory for various examples of what is possible to do with Kano.</p></blockquote><p>We will start with a really simple example by adding two different map backgrounds based on <a href="https://www.openstreetmap.org/" target="_blank" rel="noreferrer">OpenStreetMap data</a> to your Kano instance. First ensure you copied the categories and layers files in their respective directories in <code>kano/api/config</code>. Then, set <code>CATEGORIES_FILTER=&quot;OSM_LAYERS POPULATION_LAYERS&quot;</code> and <code>LAYERS_FILTER=&quot;OSM OSM_CYCLE&quot;</code> in your environment. Last, launch Kano to make the layers appear in your custom catalog.</p><details class="details custom-block"><summary>osm-layers.cjs - Used to define base layers with OpenStreetMap data.</summary><div class="language-cjs vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cjs</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>module.exports = [{</span></span>
<span class="line"><span>  name: &#39;Layers.OSM&#39;,</span></span>
<span class="line"><span>  description: &#39;Layers.OSM_DESCRIPTION&#39;,</span></span>
<span class="line"><span>  i18n: {</span></span>
<span class="line"><span>    fr: {</span></span>
<span class="line"><span>      Layers: {</span></span>
<span class="line"><span>        OSM: &#39;OpenStreeMap&#39;,</span></span>
<span class="line"><span>        OSM_DESCRIPTION: &#39;Données OpenStreetMap&#39;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    en: {</span></span>
<span class="line"><span>      Layers: {</span></span>
<span class="line"><span>        OSM: &#39;OpenStreeMap&#39;,</span></span>
<span class="line"><span>        OSM_DESCRIPTION: &#39;OpenStreeMap data&#39;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  tags: [&#39;osm&#39;],</span></span>
<span class="line"><span>  attribution: &#39;OpenStreetMap © &lt;a href=&quot;http://openstreetmap.org&quot;&gt;OpenStreetMap&lt;/a&gt; contributors&#39;,</span></span>
<span class="line"><span>  type: &#39;BaseLayer&#39;,</span></span>
<span class="line"><span>  leaflet: {</span></span>
<span class="line"><span>    type: &#39;tileLayer&#39;,</span></span>
<span class="line"><span>    isVisible: true,</span></span>
<span class="line"><span>    source: &#39;http://{s}.tile.osm.org/{z}/{x}/{y}.png&#39;,</span></span>
<span class="line"><span>    maxZoom: 21,</span></span>
<span class="line"><span>    maxNativeZoom: 18</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  cesium: {</span></span>
<span class="line"><span>    type: &#39;OpenStreetMap&#39;,</span></span>
<span class="line"><span>    isVisible: true,</span></span>
<span class="line"><span>    url: \`http://a.tile.osm.org\`</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}, {</span></span>
<span class="line"><span>  name: &#39;Layers.OSM_CYCLE&#39;,</span></span>
<span class="line"><span>  description: &#39;Layers.OSM_CYCLE_DESCRIPTION&#39;,</span></span>
<span class="line"><span>  i18n: {</span></span>
<span class="line"><span>    fr: {</span></span>
<span class="line"><span>      Layers: {</span></span>
<span class="line"><span>        OSM_CYCLE: &#39;OpenCycleMap&#39;,</span></span>
<span class="line"><span>        OSM_CYCLE_DESCRIPTION: &#39;Données OpenCycleMap&#39;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    en: {</span></span>
<span class="line"><span>      Layers: {</span></span>
<span class="line"><span>        OSM_CYCLE: &#39;OpenCycleMap&#39;,</span></span>
<span class="line"><span>        OSM_CYCLE_DESCRIPTION: &#39;OpenCycleMap data&#39;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  attribution: &#39;OpenStreetMap © &lt;a href=&quot;https://www.opencyclemap.org/&quot;&gt;OpenCycleMap&lt;/a&gt; contributors&#39;,</span></span>
<span class="line"><span>  type: &#39;BaseLayer&#39;,</span></span>
<span class="line"><span>  tags: [&#39;osm&#39;],</span></span>
<span class="line"><span>  leaflet: {</span></span>
<span class="line"><span>    type: &#39;tileLayer&#39;,</span></span>
<span class="line"><span>    isVisible: false,</span></span>
<span class="line"><span>    source: &#39;http://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png&#39;,</span></span>
<span class="line"><span>    maxZoom: 21,</span></span>
<span class="line"><span>    maxNativeZoom: 18</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  cesium: {</span></span>
<span class="line"><span>    type: &#39;OpenStreetMap&#39;,</span></span>
<span class="line"><span>    url: \`http://a.tile.thunderforest.com/cycle\`,</span></span>
<span class="line"><span>    isVisible: false</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}]</span></span></code></pre></div></details><p>Except for raster data, vector data are always converted to GeoJson upfront or as a rendering preprocessing phase in Kano.</p><h3 id="using-ogc-standards" tabindex="-1">Using OGC standards <a class="header-anchor" href="#using-ogc-standards" aria-label="Permalink to &quot;Using OGC standards&quot;">​</a></h3><p>OGC Web Services (OWS) are the <a href="https://www.ogc.org/standards/" target="_blank" rel="noreferrer">OGC standards</a> that use the internet to view, edit, manage and share geospatial data. You can notably use the following standards in Kano:</p><ul><li>Web Map Services (WMS)</li><li>Web Map Tile Service (WMTS)</li><li>Tile Map Service (TMS)</li><li>Web Feature Service (WFS)</li><li>Web Coverage Service (WCS)</li></ul><p>In this section we will use OGC web services of the <a href="https://geoservices.ign.fr/services-web-experts" target="_blank" rel="noreferrer">French geographical institute</a> (IGN). First copy the new layers file in the <code>kano/api/config/layers</code> directory. Then, add <code>&quot;POPULATION_DENSITY_WMTS POPULATION_DENSITY_WMS AIRPORTS_WFS&quot;</code> to your <code>LAYERS_FILTER</code> environment variable and launch Kano again to make the new layers appear in your custom catalog.</p><details class="details custom-block"><summary>ogc-layers.cjs - Used to define additional layers using different protocols like WMTS, WMS and WFS.</summary><div class="language-cjs vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cjs</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>module.exports = [{</span></span>
<span class="line"><span>  name: &#39;Layers.POPULATION_DENSITY_WMTS&#39;,</span></span>
<span class="line"><span>  description: &#39;Layers.POPULATION_DENSITY_WMTS_DESCRIPTION&#39;,</span></span>
<span class="line"><span>  i18n: {</span></span>
<span class="line"><span>    fr: {</span></span>
<span class="line"><span>      Layers: {</span></span>
<span class="line"><span>        POPULATION_DENSITY_WMTS: &#39;Densité (WMTS)&#39;,</span></span>
<span class="line"><span>        POPULATION_DENSITY_WMTS_DESCRIPTION: &#39;Densité de population (IGN)&#39;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    en: {</span></span>
<span class="line"><span>      Layers: {</span></span>
<span class="line"><span>        POPULATION_DENSITY_WMTS: &#39;Density (WMTS)&#39;,</span></span>
<span class="line"><span>        POPULATION_DENSITY_WMTS_DESCRIPTION: &#39;Population density (IGN)&#39;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  type: &#39;OverlayLayer&#39;,</span></span>
<span class="line"><span>  attribution: &#39;© &lt;a href=&quot;https://ign.fr&quot;&gt;IGN&lt;/a&gt;&#39;,</span></span>
<span class="line"><span>  tags: [&#39;population&#39;],</span></span>
<span class="line"><span>  cesium: {</span></span>
<span class="line"><span>    type: &#39;WebMapTileService&#39;,</span></span>
<span class="line"><span>    url: &#39;https://wxs.ign.fr/economie/geoportail/wmts?SERVICE=WMTS&amp;REQUEST=GetTile&amp;VERSION=1.0.0&amp;LAYER=INSEE.FILOSOFI.POPULATION&amp;STYLE=INSEE&amp;FORMAT=image/png&amp;TILEMATRIXSET=PM&amp;TILEMATRIX={TileMatrix}&amp;TILEROW={TileRow}&amp;TILECOL={TileCol}&#39;,</span></span>
<span class="line"><span>    format: &#39;image/png&#39;,</span></span>
<span class="line"><span>    layer: &#39;INSEE.FILOSOFI.POPULATION&#39;,</span></span>
<span class="line"><span>    style: &#39;INSEE&#39;,</span></span>
<span class="line"><span>    tileMatrixSetID: &#39;PM&#39;,</span></span>
<span class="line"><span>    isVisible: false</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  leaflet: {</span></span>
<span class="line"><span>    type: &#39;tileLayer&#39;,</span></span>
<span class="line"><span>    source: &#39;https://wxs.ign.fr/economie/geoportail/wmts?SERVICE=WMTS&amp;REQUEST=GetTile&amp;VERSION=1.0.0&amp;LAYER=INSEE.FILOSOFI.POPULATION&amp;STYLE=INSEE&amp;FORMAT=image/png&amp;TILEMATRIXSET=PM&amp;TILEMATRIX={z}&amp;TILEROW={y}&amp;TILECOL={x}&#39;,</span></span>
<span class="line"><span>    bounds: [ [40, -5], [50, 10] ],</span></span>
<span class="line"><span>    opacity: 0.5,</span></span>
<span class="line"><span>    isVisible: false</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  legendUrl: &#39;https://wxs.ign.fr/static/legends/INSEE.FILOSOFI.POPULATION-tot-legend-2017.png&#39;</span></span>
<span class="line"><span>}, {</span></span>
<span class="line"><span>  name: &#39;Layers.POPULATION_DENSITY_WMS&#39;,</span></span>
<span class="line"><span>  description: &#39;Layers.POPULATION_DENSITY_WMS_DESCRIPTION&#39;,</span></span>
<span class="line"><span>  i18n: {</span></span>
<span class="line"><span>    fr: {</span></span>
<span class="line"><span>      Layers: {</span></span>
<span class="line"><span>        POPULATION_DENSITY_WMS: &#39;Densité (WMS)&#39;,</span></span>
<span class="line"><span>        POPULATION_DENSITY_WMS_DESCRIPTION: &#39;Densité de population (IGN)&#39;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    en: {</span></span>
<span class="line"><span>      Layers: {</span></span>
<span class="line"><span>        POPULATION_DENSITY_WMS: &#39;Density (WMS)&#39;,</span></span>
<span class="line"><span>        POPULATION_DENSITY_WMS_DESCRIPTION: &#39;Population density (IGN)&#39;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  type: &#39;OverlayLayer&#39;,</span></span>
<span class="line"><span>  attribution: &#39;© &lt;a href=&quot;https://ign.fr&quot;&gt;IGN&lt;/a&gt;&#39;,</span></span>
<span class="line"><span>  tags: [&#39;population&#39;],</span></span>
<span class="line"><span>  cesium: {</span></span>
<span class="line"><span>    type: &#39;WebMapService&#39;,</span></span>
<span class="line"><span>    url: &#39;https://wxs.ign.fr/economie/geoportail/r/wms&#39;,</span></span>
<span class="line"><span>    layers: &#39;INSEE.FILOSOFI.POPULATION&#39;,</span></span>
<span class="line"><span>    parameters: {</span></span>
<span class="line"><span>      version: &#39;1.3.0&#39;,</span></span>
<span class="line"><span>      format: &#39;image/png&#39;,</span></span>
<span class="line"><span>      transparent: true,</span></span>
<span class="line"><span>      styles: &#39;INSEE&#39;</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    isVisible: false</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  leaflet: {</span></span>
<span class="line"><span>    type: &#39;tileLayer.wms&#39;,</span></span>
<span class="line"><span>    source: &#39;https://wxs.ign.fr/economie/geoportail/r/wms&#39;,</span></span>
<span class="line"><span>    layers: &#39;INSEE.FILOSOFI.POPULATION&#39;,</span></span>
<span class="line"><span>    version: &#39;1.3.0&#39;,</span></span>
<span class="line"><span>    format: &#39;image/png&#39;,</span></span>
<span class="line"><span>    transparent: true,</span></span>
<span class="line"><span>    bgcolor: &#39;FFFFFFFF&#39;,</span></span>
<span class="line"><span>    styles: &#39;INSEE&#39;,</span></span>
<span class="line"><span>    opacity: 0.5,</span></span>
<span class="line"><span>    isVisible: false</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  legendUrl: &#39;https://wxs.ign.fr/static/legends/INSEE.FILOSOFI.POPULATION-tot-legend-2017.png&#39;</span></span>
<span class="line"><span>}, {</span></span>
<span class="line"><span>  name: &#39;Layers.AIRPORTS_WFS&#39;,</span></span>
<span class="line"><span>  description: &#39;Layers.AIRPORTS_WFS_DESCRIPTION&#39;,</span></span>
<span class="line"><span>  i18n: {</span></span>
<span class="line"><span>    fr: {</span></span>
<span class="line"><span>      Layers: {</span></span>
<span class="line"><span>        AIRPORTS_WFS: &#39;Aérodromes (WFS)&#39;,</span></span>
<span class="line"><span>        AIRPORTS_WFS_DESCRIPTION: &#39;Aérodromes (IGN)&#39;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    en: {</span></span>
<span class="line"><span>      Layers: {</span></span>
<span class="line"><span>        AIRPORTS_WFS: &#39;Airports (WFS)&#39;,</span></span>
<span class="line"><span>        AIRPORTS_WFS_DESCRIPTION: &#39;Airports (IGN)&#39;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  type: &#39;OverlayLayer&#39;,</span></span>
<span class="line"><span>  icon: &#39;las la-plane&#39;,</span></span>
<span class="line"><span>  tags: [&#39;administrative&#39;],</span></span>
<span class="line"><span>  bbox: [</span></span>
<span class="line"><span>    -63.1537116941531,</span></span>
<span class="line"><span>    -21.3898266619462,</span></span>
<span class="line"><span>    55.8367758165235,</span></span>
<span class="line"><span>    51.3150480097903</span></span>
<span class="line"><span>  ],</span></span>
<span class="line"><span>  featureId: &#39;toponyme&#39;,</span></span>
<span class="line"><span>  wfs: {</span></span>
<span class="line"><span>    url: &#39;https://wxs.ign.fr/cartovecto/geoportail/wfs&#39;,</span></span>
<span class="line"><span>    version: &#39;2.0.0&#39;,</span></span>
<span class="line"><span>    searchParams: {},</span></span>
<span class="line"><span>    outputFormat: &#39;json&#39;,</span></span>
<span class="line"><span>    layer: &#39;BDCARTO_V5:aerodrome&#39;</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  leaflet: {</span></span>
<span class="line"><span>    type: &#39;geoJson&#39;,</span></span>
<span class="line"><span>    realtime: true,</span></span>
<span class="line"><span>    tiled: true,</span></span>
<span class="line"><span>    minZoom: 10</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  cesium: {</span></span>
<span class="line"><span>    type: &#39;geoJson&#39;,</span></span>
<span class="line"><span>    realtime: true</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}]</span></span></code></pre></div></details><p>You now should be able to see this after making some of the layers active:</p><p><img src="`+e+`" alt="ogc layers"></p><p>Due to the possible large amount of vector data coming from the WFS the layer is configured with <code>minZoom</code> and <code>tiled</code> property so that data is only retrieved when zoom level exceed 10 for visible tiles only.</p><h3 id="using-data-files" tabindex="-1">Using data files <a class="header-anchor" href="#using-data-files" aria-label="Permalink to &quot;Using data files&quot;">​</a></h3><p>Except by using the UI, there are two ways of adding data coming from a file based on configuration:</p><ol><li>serve and directly access the file over HTTP,</li><li>ingest the file data into the database and access it using a built-in web service.</li></ol><p>The second option is mandatory for large datasets or if you&#39;d like to perform some filtering based on data feature properties. Accessing data stored in the database rely on the concept of <a href="https://feathersjs.com/api/services.html" target="_blank" rel="noreferrer">FeathersJS service</a>. As a consequence, the layer is usually associated with one (or more) source service where the data come from. Moreover, you should define a unique <code>featureId</code> on your features so that Kano can correctly separate and update data.</p><blockquote><p>The data can be retrieved from a raw file with the <code>fileName</code> layer property or a remote file with the <code>url</code> layer property.</p></blockquote><p>You should have a look to our detailed documentation for all possible styling options in <a href="https://kalisio.github.io/kdk/api/map/map-mixins.html#map-style" target="_blank" rel="noreferrer">2D</a> or <a href="https://kalisio.github.io/kdk/api/map/map-mixins.html#globe-style" target="_blank" rel="noreferrer">3D</a>.</p><p>First copy the new layers file in the <code>kano/api/config/layers</code> directory. Then, add <code>&quot;REGIONS DEPARTMENTS&quot;</code> to your <code>LAYERS_FILTER</code> environment variable and launch Kano again to make some new layers appear in your custom catalog.</p><details class="details custom-block"><summary>file-layers.cjs - Used to define additional layers using file data.</summary><div class="language-cjs vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cjs</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// Base URL to public files hosted in the docs</span></span>
<span class="line"><span>const baseUrl = (process.env.NODE_ENV === &#39;development&#39; ? &#39;http://localhost:8082&#39; : &#39;https://kalisio.github.io/kano&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>module.exports = [{</span></span>
<span class="line"><span>  name: &#39;Layers.REGIONS&#39;,</span></span>
<span class="line"><span>  description: &#39;Layers.REGIONS_DESCRIPTION&#39;,</span></span>
<span class="line"><span>  i18n: {</span></span>
<span class="line"><span>    fr: {</span></span>
<span class="line"><span>      Layers: {</span></span>
<span class="line"><span>        REGIONS: &#39;Régions&#39;,</span></span>
<span class="line"><span>        REGIONS_DESCRIPTION: &#39;Régions Françaises&#39;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    en: {</span></span>
<span class="line"><span>      Layers: {</span></span>
<span class="line"><span>        REGIONS: &#39;Regions&#39;,</span></span>
<span class="line"><span>        REGIONS_DESCRIPTION: &#39;French regions&#39;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  tags: [&#39;administrative&#39;],</span></span>
<span class="line"><span>  type: &#39;OverlayLayer&#39;,</span></span>
<span class="line"><span>  featureId: &#39;code&#39;,</span></span>
<span class="line"><span>  leaflet: {</span></span>
<span class="line"><span>    type: &#39;geoJson&#39;,</span></span>
<span class="line"><span>    source: \`\${baseUrl}/regions.geojson\`,</span></span>
<span class="line"><span>    &#39;stroke-color&#39;: &#39;blue&#39;,</span></span>
<span class="line"><span>    &#39;fill-opacity&#39;: 0,</span></span>
<span class="line"><span>    popup: { pick: [] },</span></span>
<span class="line"><span>    tooltip: {</span></span>
<span class="line"><span>      template: &#39;&lt;b&gt;&lt;%= properties.nom %&gt;&lt;/b&gt;&#39;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  cesium: {</span></span>
<span class="line"><span>    type: &#39;geoJson&#39;,</span></span>
<span class="line"><span>    source: \`\${baseUrl}/regions.geojson\`,</span></span>
<span class="line"><span>    &#39;stroke-color&#39;: &#39;blue&#39;,</span></span>
<span class="line"><span>    &#39;fill-opacity&#39;: 0,</span></span>
<span class="line"><span>    popup: { pick: [] },</span></span>
<span class="line"><span>    tooltip: {</span></span>
<span class="line"><span>      template: &#39;&lt;%= properties.nom %&gt;&#39;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}, {</span></span>
<span class="line"><span>  name: &#39;Layers.DEPARTMENTS&#39;,</span></span>
<span class="line"><span>  description: &#39;Layers.DEPARTMENTS_DESCRIPTION&#39;,</span></span>
<span class="line"><span>  i18n: {</span></span>
<span class="line"><span>    fr: {</span></span>
<span class="line"><span>      Layers: {</span></span>
<span class="line"><span>        DEPARTMENTS: &#39;Départements&#39;,</span></span>
<span class="line"><span>        DEPARTMENTS_DESCRIPTION: &#39;Départements Français&#39;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    en: {</span></span>
<span class="line"><span>      Layers: {</span></span>
<span class="line"><span>        DEPARTMENTS: &#39;Departments&#39;,</span></span>
<span class="line"><span>        DEPARTMENTS_DESCRIPTION: &#39;French departments&#39;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  tags: [&#39;administrative&#39;],</span></span>
<span class="line"><span>  type: &#39;OverlayLayer&#39;,</span></span>
<span class="line"><span>  featureId: &#39;code&#39;,</span></span>
<span class="line"><span>  service: &#39;airports&#39;,</span></span>
<span class="line"><span>  probe: &#39;Airports&#39;,</span></span>
<span class="line"><span>  url: \`\${baseUrl}/departments.geojson\`,</span></span>
<span class="line"><span>  // Could also be a file path to a GeoJson or a gzipped GeoJson</span></span>
<span class="line"><span>  //fileName: path.join(__dirname, &#39;../../../docs/.vitepress/public/departements.geojson&#39;),</span></span>
<span class="line"><span>  leaflet: {</span></span>
<span class="line"><span>    type: &#39;geoJson&#39;,</span></span>
<span class="line"><span>    source: &#39;/api/departments&#39;,</span></span>
<span class="line"><span>    &#39;stroke-color&#39;: &#39;red&#39;,</span></span>
<span class="line"><span>    &#39;fill-opacity&#39;: 0,</span></span>
<span class="line"><span>    popup: { pick: [] },</span></span>
<span class="line"><span>    tooltip: {</span></span>
<span class="line"><span>      template: &#39;&lt;b&gt;&lt;%= properties.nom %&gt;&lt;/b&gt;&#39;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  cesium: {</span></span>
<span class="line"><span>    type: &#39;geoJson&#39;,</span></span>
<span class="line"><span>    source: &#39;/api/departments&#39;,</span></span>
<span class="line"><span>    &#39;stroke-color&#39;: &#39;red&#39;,</span></span>
<span class="line"><span>    &#39;fill-opacity&#39;: 0,</span></span>
<span class="line"><span>    popup: { pick: [] },</span></span>
<span class="line"><span>    tooltip: {</span></span>
<span class="line"><span>      template: &#39;&lt;%= properties.nom %&gt;&#39;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}]</span></span></code></pre></div></details><p>You now should be able to see a map highlighting some administrative boundaries in France:</p><p><img src="`+i+`" alt="file layers"></p><p>If you have to ingest large datasets you should consider processing data using our <a href="https://kalisio.github.io/krawler/" target="_blank" rel="noreferrer">ETL Krawler</a> or ad-hoc processors. For instance, <a href="https://github.com/kalisio/k-population" target="_blank" rel="noreferrer">k-population</a> ingest population data from a big GeoPackage into our database. You will find the associated layer definition in the built-in layers.</p><h4 id="time-varying-data" tabindex="-1">Time-varying data <a class="header-anchor" href="#time-varying-data" aria-label="Permalink to &quot;Time-varying data&quot;">​</a></h4><p>One of the best feature of Kano is interactive visualisation, meaning that data can be updated in real-time according to user actions or data updates. A typical use case is the visualisation of time-varying spatial datasets. In this section we will use some data providing the number of hospitalizations by department in France during the COVID-19 (from 20-03-2020 to 20-04-2020) to perform such a visualisation.</p><p>In this example there is one GeoJson file per day. First extract the <a href="/kano/covid-19.tar.gz">data files</a> to the <code>public</code> folder exposed by Kano. Then copy the new layers file in the <code>kano/api/config/layers</code> directory. Last, add <code>&quot;COVID_19&quot;</code> to your <code>LAYERS_FILTER</code> environment variable and launch Kano again to make the new layers appear in your custom catalog.</p><details class="details custom-block"><summary>covid-19-layers.cjs - Used to define additional time-varying layers based on file data.</summary><div class="language-cjs vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cjs</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// Base URL to public files hosted in the docs</span></span>
<span class="line"><span>const baseUrl = (process.env.NODE_ENV === &#39;development&#39; ? &#39;http://localhost:8082&#39; : &#39;https://kalisio.github.io/kano&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>module.exports = [{</span></span>
<span class="line"><span>  name: &#39;Layers.COVID_19&#39;,</span></span>
<span class="line"><span>  description: &#39;Layers.COVID_19_DESCRIPTION&#39;,</span></span>
<span class="line"><span>  i18n: {</span></span>
<span class="line"><span>    fr: {</span></span>
<span class="line"><span>      Layers: {</span></span>
<span class="line"><span>        COVID_19: &#39;COVID-19&#39;,</span></span>
<span class="line"><span>        COVID_19_DESCRIPTION: &#39;Hospitalisations par département&#39;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    en: {</span></span>
<span class="line"><span>      Layers: {</span></span>
<span class="line"><span>        COVID_19: &#39;COVID-19&#39;,</span></span>
<span class="line"><span>        COVID_19_DESCRIPTION: &#39;Hospitalizations by department&#39;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  tags: [&#39;health&#39;],</span></span>
<span class="line"><span>  icon: &#39;fas fa-atlas&#39;,</span></span>
<span class="line"><span>  attribution: &#39;Santé Publique Fance / IGN / INSEE&#39;,</span></span>
<span class="line"><span>  type: &#39;OverlayLayer&#39;,</span></span>
<span class="line"><span>  featureId: &#39;code&#39;,</span></span>
<span class="line"><span>  every: &#39;P1D&#39;,</span></span>
<span class="line"><span>  leaflet: {</span></span>
<span class="line"><span>    type: &#39;geoJson&#39;,</span></span>
<span class="line"><span>    realtime: true,</span></span>
<span class="line"><span>    sourceTemplate: \`\${baseUrl}/covid-19/hospitalisations-departements-&lt;%= time.format(&#39;YYYY-MM-DD&#39;) %&gt;.json\`,</span></span>
<span class="line"><span>    stroke: &#39;#fee8c8&#39;,</span></span>
<span class="line"><span>    &#39;stroke-width&#39;: 2,</span></span>
<span class="line"><span>    &#39;stroke-opacity&#39;: 0.5,</span></span>
<span class="line"><span>    &#39;fill-opacity&#39;: 0.5,</span></span>
<span class="line"><span>    &#39;fill-color&#39;: &#39;&lt;%= chroma.scale(\\&#39;OrRd\\&#39;).domain([0,50])(properties.taux).hex() %&gt;&#39;,</span></span>
<span class="line"><span>    template: [&#39;fill-color&#39;],</span></span>
<span class="line"><span>    tooltip: {</span></span>
<span class="line"><span>      template: &#39;&lt;b&gt;&lt;%= properties.nom %&gt;: &lt;%= properties.hospitalisations %&gt; hospitalisations&lt;/b&gt;&#39;,</span></span>
<span class="line"><span>      options: {</span></span>
<span class="line"><span>        opacity: 0.8,</span></span>
<span class="line"><span>        direction: &#39;top&#39;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  cesium: {</span></span>
<span class="line"><span>    type: &#39;geoJson&#39;,</span></span>
<span class="line"><span>    realtime: true,</span></span>
<span class="line"><span>    sourceTemplate: \`\${baseUrl}/covid-19/hospitalisations-departements-&lt;%= time.format(&#39;YYYY-MM-DD&#39;) %&gt;.json\`,</span></span>
<span class="line"><span>    entityStyle: {</span></span>
<span class="line"><span>      polygon: {</span></span>
<span class="line"><span>        outline: false,</span></span>
<span class="line"><span>        extrudedHeight: &#39;&lt;%= 1000 * properties.taux %&gt;&#39;,</span></span>
<span class="line"><span>        material: {</span></span>
<span class="line"><span>          type: &#39;Cesium.ColorMaterialProperty&#39;,</span></span>
<span class="line"><span>          options: {</span></span>
<span class="line"><span>            type: &#39;Cesium.Color.fromCssColorString&#39;,</span></span>
<span class="line"><span>            options: &#39;&lt;%= chroma.scale(\\&#39;OrRd\\&#39;).domain([0,50])(properties.taux).css() %&gt;&#39;</span></span>
<span class="line"><span>          }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      template: [&#39;polygon.extrudedHeight&#39;, &#39;polygon.material.options.options&#39;]</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    tooltip: {</span></span>
<span class="line"><span>      template: &#39;&lt;%= properties.nom %&gt;: &lt;%= properties.hospitalisations %&gt; hospitalisations&#39;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}]</span></span></code></pre></div></details><p>Using the bottom timeline, navigate to some dates within the data time range, you now should be able to see a choropleth map highlighting the number of hospitalizations for each date:</p><p><img src="`+l+'" alt="covid-19 layers"></p><p>You can even do the same using the 3D activity:</p><p><img src="'+t+`" alt="covid-19 layers in 3D"></p><h3 id="using-the-api" tabindex="-1">Using the API <a class="header-anchor" href="#using-the-api" aria-label="Permalink to &quot;Using the API&quot;">​</a></h3><p>The Kano API is particularly useful to update data continuously, a typical use case is data coming from network sensors performing measurements on the ground.</p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>You should use the <code>local.cjs</code> configuration file as stated in the <a href="./installing-kano.html">installation</a> section to setup a user account with appropriate rights (i.e. write acces to the API).</p></div><p>The different service endpoints of Kano can be accessed using REST as the most universal interface or using WebSockets if required (typically for complex queries or performance issue). The access to the endpoints are protected using a <a href="https://jwt.io/" target="_blank" rel="noreferrer">JWT</a> (i.e. token), it must be defined using the <code>Authorization</code> header (<code>Bearer token</code>) in the request header for REST.</p><p>For instance using CURL you will send a request to the API like this (the body of the request being in the <code>data.json</code> file):</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">SET</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> TOKEN=&quot;xxx&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">curl</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -X</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> POST -H &quot;Authorization: Bearer %TOKEN%&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ^</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">     -H</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Content-Type: application/json&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ^</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">     -d</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> @data.json ^</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">     https://kano.dev.kalisio.xyz/api/service</span></span></code></pre></div><p>Detailed information about the concepts and the data model behind our feature services can be found in <a href="https://kalisio.github.io/kdk/api/map/services.html#features-service" target="_blank" rel="noreferrer">the KDK documentation</a>, although focused on how to retrieve the data.</p><p>To push a new station the body of the request will be a GeoJson feature like this:</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  &quot;properties&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;id&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;174412d9e-f230-4127-af36-75654e265f56&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Station 1&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  &quot;geometry&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Point&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;coordinates&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      1.5059948323127268</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      43.547168883180966</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      0</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Feature&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>To push a new measure of the station the body of the request will be (a) GeoJson feature(s) like this:</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Single or multiple measures can be sent at once</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[{</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  &quot;time&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;2023-04-28T16:00:00&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  &quot;properties&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;id&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;174412d9e-f230-4127-af36-75654e265f56&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;value&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">24</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;status&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;OK&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  &quot;geometry&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Point&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;coordinates&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      1.5059948323127268</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      43.547168883180966</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      0</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Feature&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span></code></pre></div><p>First copy the new layers file in the <code>kano/api/config/layers</code> directory. Then, add <code>&quot;SENSORS&quot;</code> to your <code>LAYERS_FILTER</code> environment variable and launch Kano again to make the new layers appear in your custom catalog.</p><details class="details custom-block"><summary>sensors-layers.cjs - Used to define additional sensors layers based on API data feeding.</summary><div class="language-cjs vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cjs</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>module.exports = [{</span></span>
<span class="line"><span>  name: &#39;Layers.SENSORS&#39;,</span></span>
<span class="line"><span>  description: &#39;Layers.SENSORS_DESCRIPTION&#39;,</span></span>
<span class="line"><span>  i18n: {</span></span>
<span class="line"><span>    fr: {</span></span>
<span class="line"><span>      Layers: {</span></span>
<span class="line"><span>        SENSORS: &#39;Capteurs&#39;,</span></span>
<span class="line"><span>        SENSORS_DESCRIPTION: &#39;Réseau de capteurs&#39;</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      Variables: {</span></span>
<span class="line"><span>        TEMPERATURE: &#39;Température&#39;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    en: {</span></span>
<span class="line"><span>      Layers: {</span></span>
<span class="line"><span>        SENSORS: &#39;Sensors&#39;,</span></span>
<span class="line"><span>        SENSORS_DESCRIPTION: &#39;Sensors network&#39;</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      Variables: {</span></span>
<span class="line"><span>        TEMPERATURE: &#39;Temperature&#39;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  tags: [&#39;sensors&#39;],</span></span>
<span class="line"><span>  type: &#39;OverlayLayer&#39;,</span></span>
<span class="line"><span>  service: &#39;sensors-observations&#39;,</span></span>
<span class="line"><span>  probeService: &#39;sensors-stations&#39;,</span></span>
<span class="line"><span>  ttl: 7 * 24 * 60 * 60,</span></span>
<span class="line"><span>  featureId: &#39;id&#39;,</span></span>
<span class="line"><span>  featureLabel: &#39;name&#39;,</span></span>
<span class="line"><span>  from: &#39;P-7D&#39;,</span></span>
<span class="line"><span>  to: &#39;PT-1M&#39;,</span></span>
<span class="line"><span>  every: &#39;PT10M&#39;,</span></span>
<span class="line"><span>  queryFrom: &#39;PT-1H&#39;,</span></span>
<span class="line"><span>  variables: [</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      name: &#39;temperature&#39;,</span></span>
<span class="line"><span>      label: &#39;Variables.TEMPERATURE&#39;,</span></span>
<span class="line"><span>      units: [&#39;degC&#39;],</span></span>
<span class="line"><span>      range: [-50, 127],</span></span>
<span class="line"><span>      step: 5,</span></span>
<span class="line"><span>      chartjs: {</span></span>
<span class="line"><span>        backgroundColor: &#39;rgba(255, 99, 132, 128)&#39;,</span></span>
<span class="line"><span>        borderColor: &#39;rgb(255, 99, 132)&#39;,</span></span>
<span class="line"><span>        fill: false</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  ],</span></span>
<span class="line"><span>  leaflet: {</span></span>
<span class="line"><span>    type: &#39;geoJson&#39;,</span></span>
<span class="line"><span>    realtime: true,</span></span>
<span class="line"><span>    tiled: true,</span></span>
<span class="line"><span>    cluster: { disableClusteringAtZoom: 18 },</span></span>
<span class="line"><span>    &#39;marker-color&#39;: \`&lt;% if (properties.status === &#39;OK&#39;) { %&gt;green&lt;% }</span></span>
<span class="line"><span>                        else { %&gt;red&lt;% } %&gt;\`,</span></span>
<span class="line"><span>    &#39;icon-classes&#39;: &#39;fa fa-wifi&#39;,</span></span>
<span class="line"><span>    &#39;icon-x-offset&#39;: -2,</span></span>
<span class="line"><span>    &#39;icon-color&#39;: &#39;#FFF&#39;,</span></span>
<span class="line"><span>    template: [&#39;marker-color&#39;],</span></span>
<span class="line"><span>    tooltip: {</span></span>
<span class="line"><span>      template: &#39;&lt;%= properties.name %&gt;: &lt;%= properties.temperature %&gt;°C&#39;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  cesium: {</span></span>
<span class="line"><span>    type: &#39;geoJson&#39;,</span></span>
<span class="line"><span>    realtime: true,</span></span>
<span class="line"><span>    cluster: { pixelRange: 50 },</span></span>
<span class="line"><span>    &#39;marker-symbol&#39;: &#39;lighthouse&#39;,</span></span>
<span class="line"><span>    &#39;marker-color&#39;: &#39;#180EF1&#39;,</span></span>
<span class="line"><span>    tooltip: {</span></span>
<span class="line"><span>      template: &#39;&lt;%= properties.name %&gt;: &lt;%= properties.temperature %&gt;°C&#39;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}]</span></span></code></pre></div></details><p>Now, feed the API using the provided data in the public folder of the documentation:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>curl -X POST -H &quot;Authorization: Bearer %TOKEN%&quot; -H &quot;Content-Type: application/json&quot; ^</span></span>
<span class="line"><span>     -d @stations-data.json https://your.kano.domain/api/sensors-stations</span></span>
<span class="line"><span>curl -X POST -H &quot;Authorization: Bearer %TOKEN%&quot; -H &quot;Content-Type: application/json&quot; ^</span></span>
<span class="line"><span>     -d @observations-data.json https://your.kano.domain/api/sensors-observations</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>For testing purpose you can get a valid token from the local storage in the developer tool after logged into Kano.</p></div><p>Using the bottom timeline, navigate to a date/time with existing sensor data, you now should be able to see your sensor on the map, selecting it should open the value timeseries:</p><p><img src="`+o+'" alt="sensors layers"></p><p>A data layer can contain multiple time-varying elements called <em>variables</em>. The features may contain additional properties, e.g. a status (OK/NOK), a name, etc. that can be used to customize the rendering, e.g. icon, color, tooltip, etc.</p><p>The main <a href="https://kalisio.github.io/kdk/api/map/services.html#catalog-service" target="_blank" rel="noreferrer">configuration options</a> are the following:</p><ul><li>the property that will be use to uniquely identify a station (i.e. ID)</li><li>the refresh rate of the data in the layer (used to automatically update the view every N seconds in Kano)</li><li>the <em>life time</em> of a measure, i.e. if no measure found within the range <code>current time - life time</code> the station is not considered to have performed any measure for current time</li><li>the list of the variables contained in the data with associated properties to ease timeseries display (unit, range, color, ...)</li></ul><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>A layer can have no fixed stations but only measurements from sensors in order to display moving data</p></div><h2 id="customizing-the-catalog-legend" tabindex="-1">Customizing the catalog legend <a class="header-anchor" href="#customizing-the-catalog-legend" aria-label="Permalink to &quot;Customizing the catalog legend&quot;">​</a></h2><p><strong>To be completed</strong></p>',66),h=[c];function d(g,u,k,y,m,E){return n(),a("div",null,h)}const S=s(r,[["render",d]]);export{b as __pageData,S as default};
