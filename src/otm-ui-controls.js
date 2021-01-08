////////////////////////////////////////////////////////
//
// OTM Web Frontend - otm-ui-controls.js
//
// Creation and handling of all UI controls including 
// scale control but excluding map layers & language
// picker
//
// V 2.00 - 04.01.2021 - Thomas Worbs
//          Created
//
////////////////////////////////////////////////////////

// imports & requires
// ==================
import 'leaflet-filelayer';
import { ui } from '../src/index.js';
import { otm_toggle_locate } from '../src/otm-locate.js';

// our button factory
// ==================
function otm_init_button_factory() {
  
  L.Control.Button = L.Control.extend({
    
    // initialize: set options
    initialize:
      function(opts) {
        this._icon = (typeof(opts.icon) !== undefined) ? opts.icon : null;
        this._clickhandler = (typeof(opts.clickhandler) !== undefined) ? opts.clickhandler : null;
        L.setOptions(this, opts);
        
        this._button = null;
        this._button_a = null;
        this._toggleState = false;
      },
    
    // create DOM elements & add event handlers
    onAdd: 
      function (map) {
        
        // create button dom
        this._button = L.DomUtil.create('div', 'leaflet-bar');
        if (this._icon) {
          this._button_a = L.DomUtil.create('a', 'otm-button-' + this._icon, this._button);
        }
        
        // add click handler
        if (this._clickhandler) {
          L.DomEvent.on(this._button, "mousedown touchstart", (e) => {
            this._clickhandler(e);
            L.DomEvent.stop(e);
          });
        }
        
        // return created element
        return this._button;
      },

    // mandatory remove function that is empty
    onRemove:
      function (map) {
      },
    
    // our toggle status setter
    setToggleState:
      function (state) {
        this._toggleState = state;
        if (this._button_a) {
          if (state) {
            L.DomUtil.addClass(this._button_a,'otm-button-toggled');
            L.DomUtil.removeClass(this._button_a,'otm-button-' + this._icon);
            L.DomUtil.addClass(this._button_a,'otm-button-' + this._icon + '-w');
          }
          else {
            L.DomUtil.removeClass(this._button_a,'otm-button-toggled');            
            L.DomUtil.removeClass(this._button_a,'otm-button-' + this._icon + '-w');
            L.DomUtil.addClass(this._button_a,'otm-button-' + this._icon);
          }
        }
      },
    
  });
}

// ctrl button instances
// =====================
const otm_button_search = function (opts) {
  opts.icon = 'search';
  return new L.Control.Button(opts);
}

const otm_button_target = function (opts) {
  opts.icon = 'target';
  return new L.Control.Button(opts);
}

const otm_button_marker = function (opts) {
  opts.icon = 'marker';
  return new L.Control.Button(opts);
}

// init function for UI controls
// =============================
function otm_ui_init_controls() {
  
  // Init the button factory
  otm_init_button_factory();
  
  // Add search button
  ui.ctrl.buttonSeach = otm_button_search({ position: 'topleft' }).addTo(ui.map);
  
  // Add locate (target) button
  ui.ctrl.buttonLocate = otm_button_target({ 
    position: 'topleft',
    clickhandler: otm_toggle_locate
  }).addTo(ui.map);

  // Add file layer load button
  ui.ctrl.buttonFileLayer = L.Control.fileLayerLoad({
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
  }).addTo(ui.map);
  
  // replace button content of file layer
  var els = document.getElementsByClassName("leaflet-control-filelayer");
  if (els.length > 1) {
    L.DomUtil.empty(els[1]);
    L.DomUtil.addClass(els[1], 'otm-button-waypoints');
  }
  
  // Add marker button
  ui.ctrl.buttonMarker = otm_button_marker({ position: 'topleft' }).addTo(ui.map);
  
}

// show scale control
// ==================
function otm_ui_show_scale() {
  ui.ctrl.scale = L.control.scale({ maxWidth: 200, metric: true, imperial: false }).addTo(ui.map);
}

// hide scale control
// ==================
function otm_ui_hide_scale() {
  if (ui.ctrl.scale) {
    ui.ctrl.scale.remove();
    ui.ctrl.scale = null;
  }
}

// our exports
// ===========
export { otm_ui_init_controls, otm_ui_show_scale, otm_ui_hide_scale };
