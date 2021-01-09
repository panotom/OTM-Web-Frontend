////////////////////////////////////////////////////////
//
// OTM Web Frontend - otm-context.js
//
// Get & Set cookie and URL context
//
// V 2.00 - 08.01.2021 - Thomas Worbs
//          Created
//
////////////////////////////////////////////////////////

// imports & requires
// ==================
import { ui } from '../src/index.js';

// get the cookie & url context
// ============================
function otm_get_context() {

  // get languate from html language attribute
  ui.ctx.language = document.getElementsByTagName("html")[0].getAttribute("lang").toLowerCase().substring(0, 2);
  
  // get hash part of url
  var urlhash = location.hash;
  
  // parse hash
  var r = urlhash.match(/^\#([a-z]*)=([0-9]{1,2})\/([-+]?[0-9]*\.?[0-9]+)\/([-+]?[0-9]*\.?[0-9]+)/i);
  if (r !== null && r.length == 5) {
    var type = String(r[1]).toLowerCase();
    var zoom = parseInt(r[2]);
    var lat = parseFloat(r[3]);
    var lng = parseFloat(r[4]);
    if (r.length == 5 &&
        ['map','marker'].indexOf(type) > -1 &&
        !isNaN(zoom) &&
        zoom >= ui.bounds.minZoom &&
        zoom <=  ui.bounds.maxZoom &&
        !isNaN(lat) &&
        lat >= -180 &&
        lat <=  180 &&
        !isNaN(lng) &&
        lng >= -90 &&
        lng <=  90) {
      ui.ctx.mapZoom = zoom;
      ui.ctx.mapLatLng.lat = lat;
      ui.ctx.mapLatLng.lng = lng;
      if (type == 'marker') {
        ui.ctx.markerActive = true;
        ui.ctx.markerLatLng.lat = lat;
        ui.ctx.markerLatLng.lng = lng;
      }
    }
  }
}

// set the url context
// ===================
function otm_set_url_context() {
 
  // build url
  var url = OTM_ENV_BROWSERPATH + 
            ui.ctx.language + "/" +
            (ui.ctx.markerActive ? "#marker=" : "#map=") +
            ui.ctx.mapZoom + "/" +
            (ui.ctx.markerActive ? 
              (otm_coord_cut(ui.ctx.markerLatLng.lat) + "/" + otm_coord_cut(ui.ctx.markerLatLng.lng)) : 
              (otm_coord_cut(ui.ctx.mapLatLng.lat) + "/" + otm_coord_cut(ui.ctx.mapLatLng.lng)));     
  
  // replace url
  history.replaceState({},ui.loc.sitehead.title,url);
}

// cut coordinate to recent digits
// ===============================
function otm_coord_cut(coord) {
  
  return coord.toFixed(Math.ceil( 2 * Math.log(ui.ctx.mapZoom) - 1));
}

// our exports
// ===========
export { otm_get_context, otm_set_url_context };
