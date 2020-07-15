const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const port = 4000;
const db = require('../db/index.js');

app.use(express.static(path.resolve(__dirname, '/../dist')));
app.use('/', express.static('dist'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
});

app.get('/tables/get', (req, res) => {
  db.find((err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    };
  });
});

app.post('/tables/post', (req, res) => {
  const obj = req.body;
  db.insert(obj, (err) => {
    if (err) {
      res.send(err);
    } else {
      db.find(() => {});
      res.sendStatus(200)
    }
  });
});

app.post('/item/post', (req, res) => {
  const str = req.body;
  db.insertItem(str, (err) => {
    if (err) {
      res.send(err);
    } else {
      db.find(() => {});
      res.sendStatus(200);
    }
  })
});

app.delete('/item/delete', (req, res) => {
  const obj = req.body;
  db.deleteListItem(obj, (err) => {
    if (err) {
      res.send(err);
    } else {
      res.sendStatus(200);
    }
  })
});

app.delete('/list/delete', (req, res) => {
  const obj = req.body;
  db.deleteList(obj, (err) => {
    if (err) {
      res.send(err);
    } else {
      res.sendStatus(200);
    }
  })
});