const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const faker = require('faker');
faker.locale = "en";
const Ipsum = require('ipsum').Ipsum
let groot = new Ipsum();

// Create Connections ( I used both methods which is NOT best pratice, but I needed to)
//for Docker
mongoose.connect('docker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
.then(() => {
  console.log('connected!')
})
.catch((err) => {
  console.log(err)
})

// For Local
// mongoose.connect('mongodb://127.0.0.1:27017/photogallery', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true
// });

// Create Schema
const imageSchema = new mongoose.Schema({
  userName: String,
  userImg: String,
  created: String,
  helpfulness: [Number],
  caption: [String],
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
const popCollections = async () => {
  let campId = [];

  for (var i = 1; i < 100; i++) {
    campId.push(i.toString());
  }
  try {
    for (var i = 0; i < campId.length; i++) {
      await mongoose.connection.db.createCollection(campId[i])
    }
  } catch(err) {
    console.log(err);
  }
}


const urls = ['https://annebonny.s3-us-west-1.amazonaws.com/photo-1478131143081-80f7f84ca84d.jpeg',
  'https://annebonny.s3-us-west-1.amazonaws.com/photo-1486915309851-b0cc1f8a0084.jpeg',
  'https://annebonny.s3-us-west-1.amazonaws.com/photo-1504280390367-361c6d9f38f4.jpeg',
  'https://annebonny.s3-us-west-1.amazonaws.com/photo-1517824806704-9040b037703b.jpeg',
  'https://annebonny.s3-us-west-1.amazonaws.com/photo-1523987355523-c7b5b0dd90a7.jpeg',
  'https://annebonny.s3-us-west-1.amazonaws.com/photo-1532339142463-fd0a8979791a.jpeg',
  'https://annebonny.s3-us-west-1.amazonaws.com/photo-1571687949921-1306bfb24b72.jpeg']

function randomImageArrayLengthAndPop() {
  let amount = getRandomIntInclusive(1, 5);
  let array = [];
  for (var i = 0; i < amount; i++) {
    array.push(urls[getRandomIntInclusive(0, 6)]);
  }
  return array;
}

function randomHelpfullness() {
  let array = [];
  for (var i = 0; i < 5; i++) {
    array.push(getRandomIntInclusive(0, 10));
  }
  return array;
}

function randomCaptions() {
  let array = [];
  for (var i = 0; i < 5; i++) {
    array.push(groot.generate(15, 'sentences'));
  }
  return array;
}

let mainData = [{
  userName: 'Anne Bonny',
  userImg: 'https://fec-overview.s3-us-west-2.amazonaws.com/ownerPics/cartoonAB.jpeg',
  created: randomDate(new Date(2012, 0, 1), new Date()),
  helpfulness: randomHelpfullness(),
  caption: randomCaptions(),
  priority: getRandomIntInclusive(0, 10),
  imageUrl: randomImageArrayLengthAndPop()
}, {
  userName: 'Denise J',
  userImg: 'https://i.postimg.cc/x8vnvRCp/Denise.jpg',
  created: randomDate(new Date(2012, 0, 1), new Date()),
  helpfulness: randomHelpfullness(),
  caption: randomCaptions(),
  priority: getRandomIntInclusive(0, 10),
  imageUrl: randomImageArrayLengthAndPop()
}, {
  userName: 'Turbo K.',
  userImg: 'https://i.postimg.cc/MGM53rST/turbo.jpg',
  created: randomDate(new Date(2012, 0, 1), new Date()),
  helpfulness: randomHelpfullness(),
  caption: randomCaptions(),
  priority: getRandomIntInclusive(0, 10),
  imageUrl: randomImageArrayLengthAndPop()
}, {
  userName: 'Hannah M.',
  userImg: 'https://i.postimg.cc/J4Dy9wFj/Hannah.jpg',
  created: randomDate(new Date(2012, 0, 1), new Date()),
  helpfulness: randomHelpfullness(),
  caption: randomCaptions(),
  priority: getRandomIntInclusive(0, 10),
  imageUrl: randomImageArrayLengthAndPop()
}, {
  userName: 'Michael G.',
  userImg: 'https://i.postimg.cc/vBX4rbN6/Michael.jpg',
  created: randomDate(new Date(2012, 0, 1), new Date()),
  helpfulness: randomHelpfullness(),
  caption: randomCaptions(),
  priority: getRandomIntInclusive(0, 10),
  imageUrl: randomImageArrayLengthAndPop()
}]


const popMainPage = async function () {
  let Doc = mongoose.model('0', imageSchema);
  for (var i = 0; i < mainData.length; i++) {
    var instance = await new Doc(mainData[i]).save((err, data) => {
      if (err) {
        return console.log(err)
      } else {
        console.log('Data saved sucessfully')
      }
    });
  }
};

const popOtherPages = async function () {
  for (var j = 1; j < 100; j++) {
    let Doc = mongoose.model(j.toString(), imageSchema);
    for (var i = 0; i < getRandomIntInclusive(1, 5); i++) {
      var instance = await new Doc({
        userName: faker.name.firstName() + ' ' + faker.name.lastName(),
        userImg: faker.internet.avatar(),
        created: randomDate(new Date(2012, 0, 1), new Date()),
        helpfulness: randomHelpfullness(),
        caption: randomCaptions(),
        priority: getRandomIntInclusive(0, 10),
        imageUrl: randomImageArrayLengthAndPop(),
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

popCollections();
setTimeout(() => { popMainPage() }, 1000);
setTimeout(() => { popOtherPages() }, 2000);

// module.exports.popCollections = popCollections;
// module.exports.popMainPage = popMainPage;
// module.exports.popOtherPages = popOtherPages;