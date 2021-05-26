const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { image } = require('faker');
const port = 3004;
const database = require(__dirname + '/../database/database.js')

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.get('/photogallery', (req, res) => {
  let campSite = req.query.campId;
  database.getImages(campSite)
  .then((results) => {
    // console.log(results);
    // let imageArray = []
    let resultsArray = []
    // for (var i = 0; i = 5; i++) {
    //   imageArray.push(results[i].imageUrl)
    // }
    results.forEach(element => {
      // imageArray.push(element.imageUrl[0])
      resultsArray.push(element)
    });
    // console.log(imageArray)
    // return imageArray;
    // res.status(200).send(imageArray);
    res.status(200).send(resultsArray);
  })
})

// app.put('/photogallery/{campSite}', (req, res) => {
//   let camp = {campSite};
//   console.log(camp);
//   database.getImages(camp)
//   .then((results) => {
//     // console.log(results);
//     let imageArray = []
//     // for (var i = 0; i = 5; i++) {
//     //   imageArray.push(results[i].imageUrl)
//     // }
//     results.forEach(element => {
//       imageArray.push(element.imageUrl[0])
//     });
//     // console.log(imageArray)
//     // return imageArray;
//     res.status(200).send(imageArray);
//   })
// })

app.get('/', (req, res) => {
  console.log('hello world');
  // res.sendFile('/Users/michaelgallien/HackReactor/FEC/photogallery/client/dist/index.html');
});

// path.join(__dirname + '/../client/dist/index.html')


app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
})