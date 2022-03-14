const request = require('postman-request');

const getForecast = (long, lat, cb) => {
  const url = `http://api.weatherstack.com/current?access_key=6225d93294dd9a1b7b9ee07c69fe8d2d&query=${long},${lat}`;

  request({ url, json: true }, (err, res) => {
    if (err) {
      cb(err);
    } else if (res.body.error) {
      cb(res.body.error);
    } else {
      const { name: l } = res.body.location;
      const { temperature: t, feelslike: f } = res.body.current;
      cb(undefined, { t, f, l });
    }
  });
};

module.exports = getForecast;
