const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Connections ( I used both methods which is NOT best pratice, but I needed to)
// const db = mongoose.createConnection('mongodb://localhost/photogallery', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true
// });

mongoose.connect('mongodb://localhost/photogallery', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const imageSchema = new mongoose.Schema({
  userName: String,
  created: String,
  helpfulness: Number,
  caption: String,
  priority: Number,
  imageUrl: [String],
});

let Doc = mongoose.model('doc', imageSchema);


// const getPrice = (query, callback) => {
//   return Price.find(query, callback);
// }


const docsCounter = (collectionNumber, calback) => {
  return db.collection(collectionNumber).count();
}

const countDocs = function () {
  let result = '';
  // let resultsArray = [];
  for (var i = 1; i < 100; i++) {
    let Doc = mongoose.model(i.toString(), imageSchema)
    Doc.countDocuments({}, function (err, count) {
      if (err) {
        console.log(err)
      } else {
        return count;
        // if (count == 99) {
        //   result = true;
        // } else {
        //   result = false;
        // }
        // resultsArray.push(count)
        // console.log("Count :", count)
      }
    });
  }
  // for (var i = 0; i < resultsArray.length; i++) {
  //   if (resultsArray[i] === 99) {
  //     result = true;
  //   } else {
  //     return false;
  //   }
  // }
  // const print = function() {
  //   console.log(result);
  // }

  // setTimeout(print(), 500);

}

exports.countDocs = countDocs;
exports.docsCounter = docsCounter;