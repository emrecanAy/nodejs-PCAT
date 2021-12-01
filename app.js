const express = require('express');
const mongoose = require('mongoose');

const ejs = require('ejs');
const path = require('path');

const Photo = require('./models/Photo');

const app = express();

//connect DB
mongoose.connect('mongodb://localhost/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public')); //middleware-ara yazılım(req-res döngüsü içindeki her şeye middleware denir.)
app.use(express.urlencoded({ extended: true })); //express.urlencoded ve express.urlencoded; bunlar req-res döngüsünde aldığımız req'i sonlandırmamızda yardımcı oldu.
app.use(express.json()); //express.urlencoded = url'deki datayı oku. express.json = url'deki datayı jsona çevir.

//ROUTES
app.get('/', async (req, res) => {
  const photos = await Photo.find({});
  res.render('index', {
    photos
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/photos', async (req, res) => {
  await Photo.create(req.body); //calback func create olana kadar bekleyecek.
  res.redirect('/');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu port:${port}'de başlatıldı...`);
});
