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


// // Amazon s3 setup
// const BUCKET_NAME = 'annebonny';
// const ID = '';
// const SECRET = '';

// const s3 = new AWS.S3({
//   accessKeyId: 'AKIA5ECESMG7W6YPYCU2',
//   secretAccessKey: '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'
// });

// const uploadFile = (fileName) => {
//   // Read content from the file
//   const fileContent = fs.readFileSync(fileName);

//   // Setting up S3 upload parameters
//   const params = {
//       Bucket: BUCKET_NAME,
//       Key: fileName,
//       Body: fileContent
//   };

//   // Uploading files to the bucket
//   s3.upload(params, function(err, data) {
//       if (err) {
//           throw err;
//       }
//       console.log(`File uploaded successfully. ${data.Location}`);
//   });
// };

// const images = './images/';
// let fileNames = []
// // database/images

//upload data to s3
// let uploadToS3 = function() {
//   fs.readdir(images, (err, files) => {
//     files.forEach(file => {
//       fileNames.push(file);
//     });
//     console.log(fileNames)
//   })
//   // try {
//   //   fileNames = await fs.readdir(images);
//   //   console.log(fileNames)
//   //   // fileNames.forEach(file => {
//   //   //   console.log(file);
//   //   //   // uploadFile(file);
//   //   // })
//   // } catch {
//   //   console.log('no!')
//   // }

// }

// axios({
//   method: 'get',
//   // url: 'https://api.ipgeolocation.io/astronomy?apiKey=' + `${config.API}` + '&location=' + city +',%20' + state + ',%20US',
//   url: 'https://api.unsplash.com/search/photos?query=camping&client_id=RnbeOD4QsnDZClvaG7tH5rMFG1auRX3mc-jS6cBTz_0&page=1&per_page=1'
// })
//   .then((response) => {
//     console.log(response.results.urls.raw);
//   })

// uploadToS3();