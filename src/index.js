////////////////////////////////////////////////////////
//
// OTM Web Frontend - index.js
//
// Entry point with global static UI object and 
// init functions
//
// V 2.00 - 01.01.2021 - Thomas Worbs
//          Created
//
////////////////////////////////////////////////////////

// imports & requires
// ==================
import 'leaflet-filelayer';
import 'leaflet/dist/leaflet.css';

import { otm_get_context, otm_set_url_context } from '../src/otm-context.js';
import { otm_load_localization } from '../src/otm-load-localization.js';
import { otm_init_layers } from '../src/otm-layers.js';
import { otm_create_language_picker } from '../src/otm-ui-language-picker.js';
import { otm_ui_init_controls, otm_ui_show_scale, otm_ui_hide_scale } from '../src/otm-ui-controls.js';
import { otm_init_locate } from '../src/otm-locate.js';
import { otm_create_marker } from '../src/otm-marker.js';

require('../src-images/favicon.ico');
require('leaflet/dist/images/marker-shadow.png');
require('leaflet/dist/images/marker-icon.png');
require('leaflet/dist/images/layers.png');
require('leaflet/dist/images/layers-2x.png');
require('./index.scss');

// global ui object
// ================
var ui = {
  
  // context
  ctx: {
    language: 'en',
    mapLatLng: { lat: 47, lng: 11 },
    mapZoom: 5,
    baseLayer: 1,
    overlayLayers: [],
    markerActive: false,
    markerLatLng: { lat: 47, lng: 11 }
  },
  
  // bounds
  bounds: {
    minZoom: 3,
    maxZoom: 17
  },
  
  // languages & localization
  lang: null,
  loc: null,
  
  // map instance
  map: null,
  
  // map layers, will be initialized by otm_init_layers()
  layers: {
    base: {},
    overlay: {}
  },

  // ui controls
  ctrl: {
    buttonSeach: null,      // search button object
    buttonLocate: null,     // locate button object
    buttonFileLayer: null,  // file layer button object
    buttonMarker: null,     // marker button object
    scale: null,            // scale control
    languagePicker: null    // language picker control
  },
  
  // position locate control
  locate: {
    prepare: false,   // prepare status
    active: false,    // active status
    marker: null,     // marker object
    circle: null,     // accuracy circle object
    message: null     // message control object
  },
  
  // marker control
  marker: {
    e: null           // element
  }
}


// get url & cookie context
otm_get_context();
  
// init map call
otm_load_localization(otm_init, otm_error);

// error abort when language json load failed
function otm_error() {
  alert("Severe Load Error (Localization)");
}

///////////////////////////////////////////////////////////////////////////////////////

function otm_init() {

  // Replace url to clean
  otm_set_url_context();

  // Create a leaflet map instance
  ui.map = L.map('map', {
    doubleClickZoom: true,
    dragging: true,
  }).setView(ui.ctx.mapLatLng, ui.ctx.mapZoom);

  // Init the map layers
  otm_init_layers();
  
  // Create language picker
  otm_create_language_picker();
  
  // Show scale control
  otm_ui_show_scale();
  
  // Init all UI controles (buttpns left)
  otm_ui_init_controls();
  
  // Init location handling
  otm_init_locate();
  
  // Map handlers
  ui.map.on('moveend zoomend', (e) => {
    ui.ctx.mapZoom = ui.map.getZoom();
    ui.ctx.mapLatLng = ui.map.getCenter();
    otm_set_url_context();
  })
  
  // Marker display
  if (ui.ctx.markerActive) {
    otm_create_marker(ui.ctx.markerLatLng,true);
  }
}

// our exports
// ===========
export { ui };
