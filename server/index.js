const express = require('express');
const app = express();
const path = require('path');
const port = 4000;
const db = require('../db/index.js');

app.use(express.static(path.resolve(__dirname, '/../dist')));
app.use('/', express.static('dist'))
app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
});

app.use('/tables/get', (req, res) => {
  db.find((err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    };
  });
});

app.use('/tables/post', (req, res) => {

});