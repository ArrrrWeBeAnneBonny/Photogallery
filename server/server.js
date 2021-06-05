const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
var fs = require('fs');
const { image } = require('faker');
const port = 3004;
const database = require(__dirname + '/../database/database.js')
const pop = require('/Users/michaelgallien/HackReactor/FEC/photogallery/database/popscript.js')

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/../client/dist'));
app.use(express.urlencoded({ extended: true }));


// pop.popCollections();
// setTimeout(() => { pop.popMainPage() }, 500);
// setTimeout(() => { pop.popOtherPages() }, 1000);


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
      // console.log(resultsArray);
    });
    // console.log(resultsArray);
    res.status(200).send(resultsArray);
  })
})

app.get('/', (req, res) => {
  console.log('hello world');
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
})