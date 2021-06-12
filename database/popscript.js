const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const faker = require('faker');
faker.locale = "en";
const Ipsum = require('ipsum').Ipsum
let groot = new Ipsum();

// Create Connections ( I used both methods which is NOT best pratice, but I needed to)
//for Docker
// mongoose.connect('mongodb://mongo:27017/photogallery', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true
// })
// .then(() => {
//   console.log('connected!')
// })
// .catch((err) => {
//   console.log(err)
// })

// For Local
mongoose.connect('mongodb://127.0.0.1:27017/photogallery', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

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


const urls = ['https://images.unsplash.com/photo-1517771778436-39f5763f5270?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjcyMzV8MHwxfHNlYXJjaHwxOHx8Y2FtcGluZ3xlbnwwfHx8fDE2MjM0NTgyMzU&ixlib=rb-1.2.1&q=80&w=1080',
'https://images.unsplash.com/photo-1516939884455-1445c8652f83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjcyMzV8MHwxfHNlYXJjaHwxNXx8Y2FtcGluZ3xlbnwwfHx8fDE2MjM0NTgyMzU&ixlib=rb-1.2.1&q=80&w=1080',
'https://images.unsplash.com/photo-1486915309851-b0cc1f8a0084?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjcyMzV8MHwxfHNlYXJjaHw0fHxjYW1waW5nfGVufDB8fHx8MTYyMzQ1ODIzNQ&ixlib=rb-1.2.1&q=80&w=1080',
'https://images.unsplash.com/photo-1515444744559-7be63e1600de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjcyMzV8MHwxfHNlYXJjaHwxN3x8Y2FtcGluZ3xlbnwwfHx8fDE2MjM0NTgyMzU&ixlib=rb-1.2.1&q=80&w=1080',
'https://images.unsplash.com/photo-1464547323744-4edd0cd0c746?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjcyMzV8MHwxfHNlYXJjaHwyMXx8Y2FtcGluZ3xlbnwwfHx8fDE2MjM0NTgyMzU&ixlib=rb-1.2.1&q=80&w=1080',
'https://images.unsplash.com/photo-1576176539998-0237d1ac6a85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjcyMzV8MHwxfHNlYXJjaHwzfHxjYW1waW5nfGVufDB8fHx8MTYyMzQ1ODIzNQ&ixlib=rb-1.2.1&q=80&w=1080',
'https://images.unsplash.com/photo-1559521783-1d1599583485?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjcyMzV8MHwxfHNlYXJjaHwyMnx8Y2FtcGluZ3xlbnwwfHx8fDE2MjM0NTgyMzU&ixlib=rb-1.2.1&q=80&w=1080',
'https://images.unsplash.com/photo-1471115853179-bb1d604434e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjcyMzV8MHwxfHNlYXJjaHwyM3x8Y2FtcGluZ3xlbnwwfHx8fDE2MjM0NTgyMzU&ixlib=rb-1.2.1&q=80&w=1080',
'https://images.unsplash.com/photo-1563299796-17596ed6b017?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjcyMzV8MHwxfHNlYXJjaHwyNnx8Y2FtcGluZ3xlbnwwfHx8fDE2MjM0NTgyMzU&ixlib=rb-1.2.1&q=80&w=1080',
'https://images.unsplash.com/photo-1536483354957-362e50517174?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjcyMzV8MHwxfHNlYXJjaHwyN3x8Y2FtcGluZ3xlbnwwfHx8fDE2MjM0NTgyMzU&ixlib=rb-1.2.1&q=80&w=1080',
'https://images.unsplash.com/photo-1510312305653-8ed496efae75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjcyMzV8MHwxfHNlYXJjaHwyOHx8Y2FtcGluZ3xlbnwwfHx8fDE2MjM0NTgyMzU&ixlib=rb-1.2.1&q=80&w=1080',
'https://images.unsplash.com/photo-1539183204366-63a0589187ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjcyMzV8MHwxfHNlYXJjaHwzMHx8Y2FtcGluZ3xlbnwwfHx8fDE2MjM0NTgyMzU&ixlib=rb-1.2.1&q=80&w=1080',
'https://images.unsplash.com/photo-1485809052957-5113b0ff51af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjcyMzV8MHwxfHNlYXJjaHwyMHx8Y2FtcGluZ3xlbnwwfHx8fDE2MjM0NTgyMzU&ixlib=rb-1.2.1&q=80&w=1080',
'https://images.unsplash.com/photo-1475483768296-6163e08872a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjcyMzV8MHwxfHNlYXJjaHwxOXx8Y2FtcGluZ3xlbnwwfHx8fDE2MjM0NTgyMzU&ixlib=rb-1.2.1&q=80&w=1080',
'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjcyMzV8MHwxfHNlYXJjaHwxNnx8Y2FtcGluZ3xlbnwwfHx8fDE2MjM0NTgyMzU&ixlib=rb-1.2.1&q=80&w=1080',
'https://images.unsplash.com/photo-1529385101576-4e03aae38ffc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjcyMzV8MHwxfHNlYXJjaHwxNHx8Y2FtcGluZ3xlbnwwfHx8fDE2MjM0NTgyMzU&ixlib=rb-1.2.1&q=80&w=1080',
'https://images.unsplash.com/photo-1470246973918-29a93221c455?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjcyMzV8MHwxfHNlYXJjaHwxM3x8Y2FtcGluZ3xlbnwwfHx8fDE2MjM0NTgyMzU&ixlib=rb-1.2.1&q=80&w=1080',
'https://images.unsplash.com/photo-1496545672447-f699b503d270?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjcyMzV8MHwxfHNlYXJjaHwxMnx8Y2FtcGluZ3xlbnwwfHx8fDE2MjM0NTgyMzU&ixlib=rb-1.2.1&q=80&w=1080',
'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjcyMzV8MHwxfHNlYXJjaHw5fHxjYW1waW5nfGVufDB8fHx8MTYyMzQ1ODIzNQ&ixlib=rb-1.2.1&q=80&w=1080',
'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjcyMzV8MHwxfHNlYXJjaHw3fHxjYW1waW5nfGVufDB8fHx8MTYyMzQ1ODIzNQ&ixlib=rb-1.2.1&q=80&w=1080',
'https://images.unsplash.com/photo-1517824806704-9040b037703b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjcyMzV8MHwxfHNlYXJjaHw1fHxjYW1waW5nfGVufDB8fHx8MTYyMzQ1ODIzNQ&ixlib=rb-1.2.1&q=80&w=1080',
'https://images.unsplash.com/photo-1532339142463-fd0a8979791a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjcyMzV8MHwxfHNlYXJjaHwyfHxjYW1waW5nfGVufDB8fHx8MTYyMzQ1ODIzNQ&ixlib=rb-1.2.1&q=80&w=1080',
'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjcyMzV8MHwxfHNlYXJjaHwxfHxjYW1waW5nfGVufDB8fHx8MTYyMzQ1ODIzNQ&ixlib=rb-1.2.1&q=80&w=1080',
'https://images.unsplash.com/photo-1562206513-6a81cfc73936?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjcyMzV8MHwxfHNlYXJjaHwyNHx8Y2FtcGluZ3xlbnwwfHx8fDE2MjM0NTgyMzU&ixlib=rb-1.2.1&q=80&w=1080']


const urls2 = ['https://images.unsplash.com/photo-1517771778436-39f5763f5270?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjcyMzV8MHwxfHNlYXJjaHwxOHx8Y2FtcGluZ3xlbnwwfHx8fDE2MjM0NTgyMzU&ixlib=rb-1.2.1&q=80&w=1080',
'https://images.unsplash.com/photo-1516939884455-1445c8652f83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjcyMzV8MHwxfHNlYXJjaHwxNXx8Y2FtcGluZ3xlbnwwfHx8fDE2MjM0NTgyMzU&ixlib=rb-1.2.1&q=80&w=1080',
'https://images.unsplash.com/photo-1486915309851-b0cc1f8a0084?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjcyMzV8MHwxfHNlYXJjaHw0fHxjYW1waW5nfGVufDB8fHx8MTYyMzQ1ODIzNQ&ixlib=rb-1.2.1&q=80&w=1080',
'https://images.unsplash.com/photo-1515444744559-7be63e1600de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjcyMzV8MHwxfHNlYXJjaHwxN3x8Y2FtcGluZ3xlbnwwfHx8fDE2MjM0NTgyMzU&ixlib=rb-1.2.1&q=80&w=1080',
'https://images.unsplash.com/photo-1464547323744-4edd0cd0c746?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjcyMzV8MHwxfHNlYXJjaHwyMXx8Y2FtcGluZ3xlbnwwfHx8fDE2MjM0NTgyMzU&ixlib=rb-1.2.1&q=80&w=1080',
'https://images.unsplash.com/photo-1576176539998-0237d1ac6a85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjcyMzV8MHwxfHNlYXJjaHwzfHxjYW1waW5nfGVufDB8fHx8MTYyMzQ1ODIzNQ&ixlib=rb-1.2.1&q=80&w=1080',
'https://images.unsplash.com/photo-1559521783-1d1599583485?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjcyMzV8MHwxfHNlYXJjaHwyMnx8Y2FtcGluZ3xlbnwwfHx8fDE2MjM0NTgyMzU&ixlib=rb-1.2.1&q=80&w=1080',
'https://images.unsplash.com/photo-1471115853179-bb1d604434e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjcyMzV8MHwxfHNlYXJjaHwyM3x8Y2FtcGluZ3xlbnwwfHx8fDE2MjM0NTgyMzU&ixlib=rb-1.2.1&q=80&w=1080',
'https://images.unsplash.com/photo-1563299796-17596ed6b017?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjcyMzV8MHwxfHNlYXJjaHwyNnx8Y2FtcGluZ3xlbnwwfHx8fDE2MjM0NTgyMzU&ixlib=rb-1.2.1&q=80&w=1080',
'https://images.unsplash.com/photo-1536483354957-362e50517174?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjcyMzV8MHwxfHNlYXJjaHwyN3x8Y2FtcGluZ3xlbnwwfHx8fDE2MjM0NTgyMzU&ixlib=rb-1.2.1&q=80&w=1080',
'https://images.unsplash.com/photo-1510312305653-8ed496efae75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjcyMzV8MHwxfHNlYXJjaHwyOHx8Y2FtcGluZ3xlbnwwfHx8fDE2MjM0NTgyMzU&ixlib=rb-1.2.1&q=80&w=1080',
'https://images.unsplash.com/photo-1539183204366-63a0589187ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjcyMzV8MHwxfHNlYXJjaHwzMHx8Y2FtcGluZ3xlbnwwfHx8fDE2MjM0NTgyMzU&ixlib=rb-1.2.1&q=80&w=1080']

function randomImageArrayLengthAndPop() {
  let amount = getRandomIntInclusive(1, 5);
  let array = [];
  for (var i = 0; i < amount; i++) {
    array.push(urls[getRandomIntInclusive(0, 6)]);
  }
  return array;
}

function randomImageArrayLengthAndPop2() {
  let amount = getRandomIntInclusive(1, 5);
  let array = [];
  for (var i = 0; i < amount; i++) {
    array.push(urls2[getRandomIntInclusive(0, 6)]);
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
  imageUrl: randomImageArrayLengthAndPop2()
}, {
  userName: 'Denise J',
  userImg: 'https://i.postimg.cc/x8vnvRCp/Denise.jpg',
  created: randomDate(new Date(2012, 0, 1), new Date()),
  helpfulness: randomHelpfullness(),
  caption: randomCaptions(),
  priority: getRandomIntInclusive(0, 10),
  imageUrl: randomImageArrayLengthAndPop2()
}, {
  userName: 'Turbo K.',
  userImg: 'https://i.postimg.cc/MGM53rST/turbo.jpg',
  created: randomDate(new Date(2012, 0, 1), new Date()),
  helpfulness: randomHelpfullness(),
  caption: randomCaptions(),
  priority: getRandomIntInclusive(0, 10),
  imageUrl: randomImageArrayLengthAndPop2()
}, {
  userName: 'Hannah M.',
  userImg: 'https://i.postimg.cc/J4Dy9wFj/Hannah.jpg',
  created: randomDate(new Date(2012, 0, 1), new Date()),
  helpfulness: randomHelpfullness(),
  caption: randomCaptions(),
  priority: getRandomIntInclusive(0, 10),
  imageUrl: randomImageArrayLengthAndPop2()
}, {
  userName: 'Michael G.',
  userImg: 'https://i.postimg.cc/vBX4rbN6/Michael.jpg',
  created: randomDate(new Date(2012, 0, 1), new Date()),
  helpfulness: randomHelpfullness(),
  caption: randomCaptions(),
  priority: getRandomIntInclusive(0, 10),
  imageUrl: randomImageArrayLengthAndPop2()
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