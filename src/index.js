import 'leaflet/dist/leaflet.css';
import 'leaflet-filelayer';
import { 
  otm_init_button_factory,
  otm_button_search,
  otm_button_target,
  otm_button_marker
} from '../src/otm-buttons.js';
require('./index.scss');


// OTM layer object
const layerOtm = new L.TileLayer(
  'https://opentopomap.org/{z}/{x}/{y}.png', 
  {
    minZoom: 5,
    maxZoom: 17,
    attribution: 'Kartendaten: <a href="https://openstreetmap.org">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Kartendarstellung: <a href="https://opentopomap.org">OpenTopoMap</a>, &copy; <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>'
}); 

// OSM layer object
const layerOsm = new L.TileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
  {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Lonvia hiking
const layerLonviaHiking = new L.TileLayer(
  'https://tile.waymarkedtrails.org/hiking/{z}/{x}/{y}.png', 
  {
    maxZoom: 15,
    attribution: 'Wanderwege &copy; Lonvia',
    opacity: 0.7
});

// Lonvia cycling
const layerLonviaCycling = new L.TileLayer(
  'http://tile.waymarkedtrails.org/cycling/{z}/{x}/{y}.png', 
  {
    maxZoom: 15,
    attribution: 'Wanderwege &copy; Lonvia',
    opacity: 0.7
});

// objects for layer control
const baseLayers = {
  "OpenTopoMap": layerOtm,
  "OpenStreetMap": layerOsm
};

const overlayLayers = {
  "Lonvia Wanderrouten": layerLonviaHiking,
  "Lonvia Radrouten": layerLonviaCycling
};

// global for our map instance
var map = null;

// heat out button factory
otm_init_button_factory();

// init map call
otm_init();

////////////////////////////////////////////////////////////////////////////////

function otm_init() {

  // Create a leaflet map instance
  map = L.map('map', {
    doubleClickZoom: true,
    dragging: true,
  }).setView([47, 11], 5);


  // Add OTM layer
  layerOtm.addTo(map);
  
  // Add the layer control
  L.control.layers(baseLayers, overlayLayers).addTo(map);
  
  // Add scale control
  L.control.scale({ maxWidth: 200, metric: true, imperial: false }).addTo(map);
  
  // Add search button
  otm_button_search({ position: 'topleft' }).addTo(map);
  
  // Add target button
  otm_button_target({ position: 'topleft' }).addTo(map);

  // Add file layer load button
  L.Control.fileLayerLoad({
    layer: L.geoJson,
    layerOptions: {style: {color:'red'}},
    addToMap: true,
    fileSizeLimit: 1024,
    formats: [
      '.geojson',
      '.json',
      '.kml',
      '.gpx'
    ]
  }).addTo(map);
  
  // replace button content of file layer
  var els = document.getElementsByClassName("leaflet-control-filelayer");
  if (els.length > 1) {
    L.DomUtil.empty(els[1]);
    L.DomUtil.addClass(els[1], 'otm-button-waypoints');
  }
  
  // Add marker button
  otm_button_marker({ position: 'topleft' }).addTo(map);
  
}


///////////////////////////////////////////////////////////////////////////////

