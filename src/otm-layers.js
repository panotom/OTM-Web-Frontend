////////////////////////////////////////////////////////
//
// OTM Web Frontend - otm-layers.js
//
// Definition and initialization of all map base and 
// overlay layers, creation of layer control
//
// V 2.00 - 04.01.2021 - Thomas Worbs
//          Created
//
////////////////////////////////////////////////////////

// imports & requires
// ==================
import { ui } from '../src/index.js';

// init function installing handlers
// =================================
function otm_init_layers() {

  // layer DEFINITIONS
  // OTM base layer object
  ui.layers.base[ui.loc.layers_base.OTM] = new L.TileLayer(
    'https://opentopomap.org/{z}/{x}/{y}.png', {
      minZoom: 5,
      maxZoom: 17,
      attribution: ui.loc.c.map_data + ': <a href="https://openstreetmap.org">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | ' + ui.loc.c.map_imagery + ': <a href="https://opentopomap.org">OpenTopoMap</a>, &copy; <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>'
    });

  // OSM layer object
  ui.layers.base[ui.loc.layers_base.OSM] = new L.TileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> ' + ui.loc.c.contributors
    });

  // Lonvia hiking
  ui.layers.overlay[ui.loc.layers_overlay.Lonvia_hike] = new L.TileLayer(
    'https://tile.waymarkedtrails.org/hiking/{z}/{x}/{y}.png', {
      maxZoom: 15,
      attribution: ui.loc.c.hikeroutes + ' &copy; Lonvia',
      opacity: 0.7
    });

  // Lonvia cycling
  ui.layers.overlay[ui.loc.layers_overlay.Lonvia_bike] = new L.TileLayer(
    'http://tile.waymarkedtrails.org/cycling/{z}/{x}/{y}.png', {
      maxZoom: 15,
      attribution: ui.loc.c.bikeroutes + ' &copy; Lonvia',
      opacity: 0.7
    });

  // Add OTM layer
  ui.layers.base[ui.loc.layers_base.OTM].addTo(ui.map);
  
  // Add the layer control
  L.control.layers(ui.layers.base, ui.layers.overlay).addTo(ui.map);
}

// our exports
// ===========
export { otm_init_layers };
