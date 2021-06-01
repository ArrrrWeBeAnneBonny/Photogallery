const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
var fs = require('fs');
const { image } = require('faker');
const port = 3004;
const database = require(__dirname + '/../database/database.js')

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.get('/photogallery', (req, res) => {
  if (!req.query.campId) {
    campSite = 1;
  } else {
    campSite = req.query.campId;
  }
  database.getImages(campSite)
  .then((results) => {
    let resultsArray = []
    results.forEach(element => {
      resultsArray.push(element)
    });
    res.status(200).send(resultsArray);
  })
})

app.get('/', (req, res) => {
  console.log('hello world');
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
})