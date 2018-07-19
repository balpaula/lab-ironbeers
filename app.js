
const express = require('express');
const hbs     = require('hbs');
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();
const app     = express();

hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {

  punkAPI.getBeers()
    .then(beers => {
      //console.log('beers', beers);
      res.render('beers', { beers });
    })
    .catch(error => {
      console.log(error)
    })

});

app.get('/random-beers', (req, res, next) => {
  res.render('random-beers');
});


app.listen(3000);