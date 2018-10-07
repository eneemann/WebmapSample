
// add javascript code for map functionality
require([
  // add ESRI components needed for map and dojo/domReady!
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/widgets/Legend",
  "esri/widgets/LayerList",
  "esri/widgets/BasemapToggle",
  "dojo/domReady!"
],
  // add components as arguments in the function
  function(Map, MapView, FeatureLayer, Legend, LayerList, BasemapToggle){
  var map = new Map({
    basemap: "streets"     	// set default basemap to streets
  });
  
  // create map view
  var view = new MapView({
    container: "viewDiv",  	// Reference to the scene div in the HTML body section
    map: map,  				// Reference to the map object created before the scene
    zoom: 7,  				// Sets the zoom level based on level of detail (LOD)
    center: [-110.3, 47.0] 	// Sets the center point of view in lon/lat
  });

  // add desired map layers as "FeatureLayers" from map service I created
  // counties and water usage numbers from Montana state library (polygons) and class-provided data (table)
  var countyWater = new FeatureLayer ({
  url: "http://cipher.digit.utah.edu:6080/arcgis/rest/services/Neemann/_/MapServer/3"
  });
  // lakes from Montana state library (polygons)
  var lakes = new FeatureLayer ({
  url: "http://cipher.digit.utah.edu:6080/arcgis/rest/services/Neemann/_/MapServer/2"
  });
  // rivers and streams from Montana state library (polylines)
  var streams = new FeatureLayer ({
  url: "http://cipher.digit.utah.edu:6080/arcgis/rest/services/Neemann/_/MapServer/1"
  });
  // cities from Montana state library (points) - labels didn't work
  var cities = new FeatureLayer ({
  url: "http://cipher.digit.utah.edu:6080/arcgis/rest/services/Neemann/_/MapServer/0"
  });

  // Create the PopupTemplate for click queries
  var newTemplate = { // autocasts as new PopupTemplate()
  content: "<p><b> &nbsp; County: {NAME}</b></p>" +
    "<p> &nbsp; Population: {TotalPop}</p>" +
	"<p> &nbsp; Area: {SQMILES} Sq Mi</p>" +
	"<p> &nbsp; Surface Freshwater Withdrawals: {TO_WSWFr} Mgal/Day</p>" +
	"<p> &nbsp; Total Water Withdrawals: {TO_WTotl} Mgal/Day</p>",
  };
   
  // assign template to countyWater layer
  countyWater.popupTemplate = newTemplate;
  
  // add map layers
  map.addMany([countyWater, lakes, streams, cities]);
  
  // create legend and name layers: surface water usage, lakes, streams, cities
  var legend = new Legend({
  view: view,
  layerInfos: [{
  layer: countyWater,
  title: "Surface Water Usage"
  },
  {
  layer: lakes,
  title: "Lakes"
  },
  {
  layer: streams,
  title: "Rivers & Streams"
  },
  {
  layer: cities,
  title: "Cities"
  }
  ]});
  // add legend to view in bottom-right corner
  view.ui.add(legend, {
  position: "bottom-right"
  });
  
  // create list for layers
  var layerList = new LayerList({
  view: view,
  });
  // add layer list to view in bottom-left corner
  view.ui.add(layerList, {
  position: "bottom-left"
  });
  
  // create basemap toggle
  var toggle = new BasemapToggle({
  // Set properties
  view: view, // view that provides access to the map's 'topo' basemap
  nextBasemap: "hybrid" // allows for toggling to the 'hybrid' basemap
  });
  // add basemap toggle to view in top-right corner
  view.ui.add(toggle, {
  position: "top-right"
  });
});