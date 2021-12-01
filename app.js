const express = require('express');
const ejs = require('ejs');
const path = require('path');

const app = express();

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public')); //middleware-ara yazılım(req-res döngüsü içindeki her şeye middleware denir.)

//ROUTES
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu port:${port}'de başlatıldı!`);
});
