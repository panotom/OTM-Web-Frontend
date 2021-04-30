////////////////////////////////////////////////////////
//
// OTM Web Frontend - otm-marker.js
//
// All functions for the marker
//
// V 2.00 - 08.01.2021 - Thomas Worbs
//          Created
//
////////////////////////////////////////////////////////

// imports & requires
// ==================
import { ui } from '../src/index.js';
import { otm_set_url_context } from '../src/otm-context.js';

// toggle marker function (called by the control on click)
// =======================================================
function otm_toggle_marker() {
  
  if (ui.ctx.markerActive) {
    otm_remove_marker();
  }
  else {
    otm_create_marker(ui.map.getCenter(),false);    
  }
}

// create marker at the center of the map
// ======================================
function otm_create_marker(pos,init) {
  
  // nothing to do if already there
  if (ui.ctx.markerActive && !init) {
    return;
  }
  
  // create marker element
  ui.marker.e = L.marker(
    pos,
    {
      //icon: L.Icon.Default,
      draggable: true,
      autoPan: true
    }
  ).addTo(ui.map);
  //console.log('MARKER ',ui.marker.e)
  
  // add drag end event for updating context
  ui.marker.e.on('dragend', onMarkerMoved);
  
  // set active flag & pos
  ui.ctx.markerActive = true;
  ui.ctx.markerLatLng = pos;
  
  // set context
  otm_set_url_context();
  
  // change button state
  ui.ctrl.buttonMarker.setToggleState(true);
}

// remove marker
// =============
function otm_remove_marker() {
  
  // nothing to do if no marker there
  if (!ui.ctx.markerActive) {
    return;
  }

  // remove marker element
  ui.marker.e.remove();
  
  // reset active flag
  ui.ctx.markerActive = false;
  
  // set context
  otm_set_url_context();
  
  // change button state
  ui.ctrl.buttonMarker.setToggleState(false);
}

// marker moved event handler
// ==========================
function onMarkerMoved(e) {
  
  // get new marker pos
  ui.ctx.markerLatLng = this.getLatLng();
  
  // set context
  otm_set_url_context(); 
}

// our exports
// ===========
export { otm_toggle_marker, otm_create_marker };
