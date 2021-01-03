// our button factory
// ==================
function otm_init_button_factory() {
  
  L.Control.Button = L.Control.extend({
    
    initialize:
      function(opts) {
        this._icon = (typeof(opts) !== undefined) ? opts.icon : null;
        this._clickhandler = (typeof(opts) !== undefined) ? opts.clickhandler : null;
        L.setOptions(this, opts);
      },
    
    onAdd: 
      function (map) {
        
        // create button dom
        var button = L.DomUtil.create('div', 'leaflet-bar');
        if (this._icon) {
          L.DomUtil.create('a', 'otm-button-' + this._icon, button);
        }
        
        // add click handler
        var self = this;
        if (this._clickhandler) {
          L.DomEvent.on(button, "mousedown touchstart", function (e) {
            self._clickhandler(e);
            L.DomEvent.stop(e);
          });
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
