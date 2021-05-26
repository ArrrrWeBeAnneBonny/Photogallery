const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const faker = require('faker');
faker.locale = "en";
const Ipsum = require('ipsum').Ipsum
let groot = new Ipsum();

// Create Connections ( I used both methods which is NOT best pratice, but I needed to)
const db = mongoose.createConnection('mongodb://localhost/photogallery', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

mongoose.connect('mongodb://localhost/photogallery', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

// Create Schema
const imageSchema = new mongoose.Schema({
  userName: String,
  created: String,
  helpfulness: Number,
  caption: String,
  priority: Number,
  imageUrl: [String],
});

// Random Generators
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toString();
}
// Seeding Collections
let campId = [];

for (var i = 1; i < 100; i++) {
  campId.push(i.toString());
}
for (var i = 0; i < campId.length; i++) {
  db.createCollection(campId[i]);
}

const urls = ['https://annebonny.s3-us-west-1.amazonaws.com/photo-1478131143081-80f7f84ca84d.jpeg',
  'https://annebonny.s3-us-west-1.amazonaws.com/photo-1486915309851-b0cc1f8a0084.jpeg',
  'https://annebonny.s3-us-west-1.amazonaws.com/photo-1504280390367-361c6d9f38f4.jpeg',
  'https://annebonny.s3-us-west-1.amazonaws.com/photo-1517824806704-9040b037703b.jpeg',
  'https://annebonny.s3-us-west-1.amazonaws.com/photo-1523987355523-c7b5b0dd90a7.jpeg',
  'https://annebonny.s3-us-west-1.amazonaws.com/photo-1532339142463-fd0a8979791a.jpeg',
  'https://annebonny.s3-us-west-1.amazonaws.com/photo-1571687949921-1306bfb24b72.jpeg']

// Populate Individual collections.
const popOtherPages = function () {
  for (var i = 1; i < 100; i++) {
    for (var j = 1; j < 100; j++) {
      let Doc = mongoose.model(j.toString(), imageSchema);
      var instance = new Doc({
        userName: faker.name.firstName() + ' ' + faker.name.lastName(),
        created: randomDate(new Date(2012, 0, 1), new Date()),
        helpfulness: getRandomIntInclusive(0, 15),
        caption: groot.generate(10, 'sentences'),
        priority: getRandomIntInclusive(0, 5),
        imageUrl: urls[getRandomIntInclusive(0, 6)],
      }).save((err, data) => {
        if (err) {
          return console.log(err)
        } else {
          console.log('Data saved sucessfully')
        }
      });
    }
  }
}

setTimeout(() => { popOtherPages() }, 1000);