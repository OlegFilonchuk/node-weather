const request = require('postman-request');

const getGeocode = (address, cb) => {
  const coordinatesURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoib2xlZy1maWxvbmNodWsiLCJhIjoiY2t5ajVqd3UzMmo5ODJ4cGJybmIzdnlncSJ9.PVYwxCLeD2ikAwN_ootdwg&limit=1`;

  request({ url: coordinatesURL, json: true }, (err, res) => {
    if (err) {
      cb(err);
    } else if (res.body.error) {
      cb(res.body.error);
    } else {
      const { center } = res.body.features[0] || {};
      cb(undefined, center);
    }
  });
};

module.exports = getGeocode;
