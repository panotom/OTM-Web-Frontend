////////////////////////////////////////////////////////
//
// OTM Web Frontend - otm-maidenhead.js
//
// Maidenhead encoders and decoders 
// based on code of Iván Sánchez Ortega 
// (https://github.com/IvanSanchez)
//
// V 2.00 - 30.04.2021 - Thomas Worbs
//          Created
//
////////////////////////////////////////////////////////


// Maidenhead encoder from lat, lng, precision (2,4, or 6)
// =======================================================
function otm_encode_maidenhead(lat, lng, precision) {

  // init return string
  let str = "";

	// lat-lng as percentages of the current scope
	let latPct = (lat + 90) / 180;
  while (lng > 180) {
    lng -= 360;
  }
  while (lng < -180) {
    lng += 360;
  }
	let lngPct = (lng + 180) / 360;

	// lat-lng will become multiples of the current scope

	// Fields, 18x18 in total, each 20deg lng and 10deg lat
	lngPct *= 18;
	latPct *= 18;
	str += getLetter(Math.floor(lngPct));
	str += getLetter(Math.floor(latPct));

	if (precision === 2) {
		return str;
	}

	// Squares, 10x10 per field, each 2deg lng and 1deg lat
	lngPct = (lngPct - Math.floor(lngPct)) * 10;
	latPct = (latPct - Math.floor(latPct)) * 10;

	str += Number(Math.floor(lngPct));
	str += Number(Math.floor(latPct));

	if (precision === 4) {
		return str;
	}

	// Subsquares, 24x24 per square, each 5min lng and 2.5min lat
	lngPct = (lngPct - Math.floor(lngPct)) * 24;
	latPct = (latPct - Math.floor(latPct)) * 24;

	str += getLetter(Math.floor(lngPct)).toLowerCase();
	str += getLetter(Math.floor(latPct)).toLowerCase();

	if (precision === 6) {
		return str;
	}

	// Extended subsquares, 10x10 per subsquare, each 0.5min lng and 0.25min lat
	lngPct = (lngPct - Math.floor(lngPct)) * 10;
	latPct = (latPct - Math.floor(latPct)) * 10;

	str += Number(Math.floor(lngPct));
	str += Number(Math.floor(latPct));

	if (precision === 8) {
		return str;
	}

	throw new Error(
		"Precision level invalid (must be 2, 4 6 or 8)"
	);

}

// letter index generator
function getLetter(idx) {
	return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(idx);
};

// our exports
// ===========
export { otm_encode_maidenhead };
