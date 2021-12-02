const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');

const ejs = require('ejs');
const path = require('path');
const fs = require('fs');

const Photo = require('./models/Photo');
const photoController = require('./controllers/photosController');
const pageController = require('./controllers/pagesController');
const { RSA_NO_PADDING } = require('constants');

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
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

//ROUTES
app.get('/', photoController.getAllPhotos);
app.get('/photos/:id', photoController.getPhoto);
app.put('/photos/:id', photoController.updatePhoto);
app.post('/photos', photoController.createPhoto);
app.delete('/photos/:id', photoController.deletePhoto);

app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);
app.get('/photos/edit/:id', pageController.getEditPage);

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu port:${port}'de başlatıldı...`);
});
