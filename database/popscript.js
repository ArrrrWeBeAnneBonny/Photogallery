// import faker from 'faker';
const axios = require('axios');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const fs = require('fs');
const AWS = require('aws-sdk');
// var numberToWords = require('number-to-words');
const faker = require('faker');
faker.locale = "en";
const Ipsum = require('ipsum').Ipsum
let groot = new Ipsum();



// Amazon s3 setup
const BUCKET_NAME = 'annebonny';
const ID = '';
const SECRET = '';

const s3 = new AWS.S3({
  accessKeyId: 'AKIA5ECESMG7W6YPYCU2',
  secretAccessKey: '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'
});

const uploadFile = (fileName) => {
  // Read content from the file
  const fileContent = fs.readFileSync(fileName);

  // Setting up S3 upload parameters
  const params = {
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: fileContent
  };

  // Uploading files to the bucket
  s3.upload(params, function(err, data) {
      if (err) {
          throw err;
      }
      console.log(`File uploaded successfully. ${data.Location}`);
  });
};

const db = mongoose.createConnection('mongodb://localhost/FEC', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

// mongoose.connect('mongodb://localhost/FEC', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true
// });

// Create Schema
const imageSchema = new mongoose.Schema({
  userName: String,
  created: String,
  helpfulness: Number,
  caption: String,
  priority: Number,
  imageUrl: [String],
});

// let Doc = mongoose.model('Doc', imageSchema);

// Random Number Generator (double inclusive)
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Populate Collections
let campId = [];

for (var i = 1; i < 00; i++) {
  campId.push(i.toString());
}

for (var i = 0; i < campId.length; i++) {
  db.createCollection(campId[i]);
}

// Populate Individual collections.
// Create Main Page Data 1st

const popMainPage = function () {
  let userNameArray = [];
  let Doc = mongoose.model('0', imageSchema);
  // Populate Name Array
  for (var i = 0; i < 4; i++) {
    userNameArray.push(faker.name.findName());
  }
  // Populate Database
  for (var i = 0; i < userNameArray.length; i++) {
    db.collection('0').findOne({
      userName: userNameArray[i]
    }, function (err, results) {
      if (err) {
        console.log(err);
      }
      if (!results) {
        axios({
          method: 'get',
          // url: 'https://api.ipgeolocation.io/astronomy?apiKey=' + `${config.API}` + '&location=' + city +',%20' + state + ',%20US',
          url: 'https://api.unsplash.com/search/photos?query=camping&client_id=RnbeOD4QsnDZClvaG7tH5rMFG1auRX3mc-jS6cBTz_0&page=1&per_page=10'
        })

        var instance = new Doc({
          userName: userNameArray[i],
          created: 'String', //res.results.created_at
          helpfulness: getRandomIntInclusive(0, 15),
          caption: 'String',
          priority: getRandomIntInclusive(0, 5),
          imageUrl: 'String',
        }).save((err, data) => {
          if (err) {
            return console.log(err)
          } else {
            console.log('Data saved sucessfully')
          }
        });
      } else {
        console.log('The data is in the repo already!')
      }
    })
  }
}

// popMainPage();





// let userName = [];
// let created = [];
// let helpfulness = [];
// let caption = [];
// let priority = [];
// let imageurl = [];

// // Generate Fake Data
// for (var i = 0; i < 99; i++) {
//     campId.push(i.toString());
// }
// for (var i = 0; i < 99; i++) {
//     userName.push(faker.name.findName());
// }
// function randomDate(start, end) {
//     return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toString();
// }
// for (var i = 0; i < 99; i++) {
//     created.push(randomDate(new Date(2012, 1, 1), new Date()));
// }
// function getRandomIntInclusive(min, max) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min + 1) + min); //double inclusive
// }
// for (var i = 0; i < 99; i++) {
//     helpfulness.push(getRandomIntInclusive(0, 10))
// }
// for (var i = 0; i < 99; i++) {
//     priotirty.push(getRandomIntInclusive(0, 1))
// }
// for (var i = 0; i < 99; i++) {
//     captiony.push(groot.generate())
// }

// testCollection.findOne({
//     userName: 'Bob'
//   }, function(err, results) {
//     if (err) {
//       console.log(err);
//     }
//     if (!results) {
//       var instance = new testCollection({
//         userName: 'Bob',
//         created: 'String',
//         helpfulness: 5,
//         caption: 'String',
//         priority: 'String',
//         imageUrl: 'String',
//       }).save((err, data) => {
//         if (err) {
//           return console.log(err)
//         } else {
//           console.log('Data saved sucessfully')
//         }
//     });
// } else {
//     console.log('The data is in the repo already!')
//   }
// })