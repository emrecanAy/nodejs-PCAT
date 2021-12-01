const express = require('express');
const path = require('path');

const app = express();

//MIDDLEWARES
app.use(express.static('public')); //middleware-ara yazılım(req-res döngüsü içindeki her şeye middleware denir.)

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'temp/index.html'));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu port:${port}'de başlatıldı!`);
});
