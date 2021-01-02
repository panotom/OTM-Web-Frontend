import 'leaflet/dist/leaflet.css';
require('./index.scss');


// our button factory
// ==================
function otm_init_button_factory() {
  
  L.Control.Button = L.Control.extend({
    
    initialize:
      function(opts) {
        this._icon = (typeof(opts) !== undefined) ? opts.icon : null;
        L.setOptions(this, opts);
      },
    
    onAdd: 
      function (map) {
        var button = L.DomUtil.create('div', 'leaflet-bar');
        if (this._icon) {
          L.DomUtil.create('a', 'otm-button-' + this._icon, button);
        }
        return button;
    },

    onRemove:
      function (map) {
      }
    
  });
}

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

// our exports
// ===========
export {
  otm_init_button_factory,
  otm_button_search,
  otm_button_target,
  otm_button_marker
};
