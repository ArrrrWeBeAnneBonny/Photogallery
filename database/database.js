const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// For local service
const db = mongoose.createConnection('mongodb://localhost/photogallery', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

mongoose.connect('mongodb://localhost/photogallery', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

//for Docker
// const db = mongoose.createConnection('mongodb://mongo:27017/photogallery', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true
// })
// .then(() => {
//   console.log('connected!');
// })
// .catch(() => {
//   console.log('connection failed');
// })

// mongoose.connect('mongodb://mongo:27017/photogallery', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true
// });

// For JEST
// const imageSchema = new mongoose.Schema({
//   userName: String,
//   created: String,
//   helpfulness: Number,
//   caption: String,
//   priority: Number,
//   imageUrl: [String],
// });

// let Doc = mongoose.model('doc', imageSchema);

// const countDocs = function () {
//   let result = '';
//   for (var i = 1; i < 100; i++) {
//     let Doc = mongoose.model(i.toString(), imageSchema)
//     Doc.countDocuments({}, function (err, count) {
//       if (err) {
//         console.log(err)
//       } else {
//         return count;
//       }
//     });
//   }
// };

const docsCounter = (collectionNumber, calback) => {
  return db.collection(collectionNumber).count();
}

// for docker
// const getImages = function(collectionNumber) {
//   const collection = mongoose.connection.db.collection(collectionNumber.toString());
//   const result = collection.find({}).toArray();
//   return result;
// }

//for local
const getImages = function(collectionNumber) {
  const collection = db.collection(collectionNumber.toString());
  const result = collection.find({}).toArray();
  return result;
}



exports.getImages = getImages;
// exports.countDocs = countDocs;
exports.docsCounter = docsCounter;