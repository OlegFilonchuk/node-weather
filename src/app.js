const path = require('path');
const express = require('express');
const hbs = require('hbs');
const getGeocode = require('./utils/getGeocode');
const getForecast = require('./utils/getForecast');

const app = express();
const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Oleh F',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About page',
    name: 'Hanna F',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help page',
    name: 'Marko F',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({ error: 'No address provided' });
  }

  getGeocode(req.query.address, (err, [lat, long] = []) => {
    if (err) {
      return res.send({ error: err });
    }
    getForecast(long, lat, (err, { t, f, l } = {}) => {
      if (err) {
        return res.send({ error: err });
      }
      res.send({
        location: l,
        address: req.query.address,
        forecast: `The temperature in ${l} is ${t}°C, feels like ${f}°C.`,
      });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }

  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Help page',
    name: 'Marko F',
    errorMessage: 'Help article not found',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Error page',
    name: 'Marko F',
    errorMessage: 'Page not found',
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
