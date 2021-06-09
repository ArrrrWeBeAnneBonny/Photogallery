const mongoose = require('mongoose');

const db = mongoose.createConnection('mongodb://localhost/photogallery', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

let campId = [];

for (var i = 0; i < 100; i++) {
  campId.push(i.toString());
}

const first25 = async () => {
    for (var i = 0; i < 25; i++) {
       await db.createCollection(campId[i]);
    }
}

// const second25 = async () => {
//     for (var i = 25; i < 50; i++) {
//         await db.createCollection(campId[i]);
//     }
// }

// const third25 = async () => {
//     for (var i = 50; i < 75; i++) {
//         await db.createCollection(campId[i]);
//     }
// }

// const fourth25 = async () => {
//     for (var i = 75; i < 100; i++) {
//         await db.createCollection(campId[i]);
//     }
// }

// first25();
// setTimeout(() => { second25() }, 10000);
// setTimeout(() => { third25() }, 20000);
// setTimeout(() => { fourth25() }, 30000);