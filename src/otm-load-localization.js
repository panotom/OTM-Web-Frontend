////////////////////////////////////////////////////////
//
// OTM Web Frontend - otm-load-localization.js
//
// Localization JSON loader -> global ui.loc
//
// V 2.00 - 05.01.2021 - Thomas Worbs
//          Created
//
////////////////////////////////////////////////////////

// imports & requires
// ==================
import {
  get as axiosget
} from 'axios';
import {
  ui
} from '../src/index.js';

// async localization loader
// =========================
function otm_load_localization(success, error) {

  var lang = document.getElementsByTagName("html")[0].getAttribute("lang").toLowerCase().substring(0, 2);
  console.log("Language from html element: ", lang);
  ui.ctx.language = lang;

  axiosget(OTM_ENV_BROWSERPATH + 'l/lang.json')
    .then(({
      data
    }) => {
      ui.lang = data;
      axiosget(OTM_ENV_BROWSERPATH + 'l/' + ui.ctx.language + '.json')
        .then(({
          data
        }) => {
          ui.loc = data;
          console.log(ui);
          success();
        })
        .catch((err) => {
          console.log(err);
          error();
        })

    })
    .catch((err) => {
      console.log(err);
      error();
    })
}

// our exports
// ===========
export {
  otm_load_localization
};
