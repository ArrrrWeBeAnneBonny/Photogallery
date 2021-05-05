// const config = require('../config.js');
const axios = require('axios');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/FEC', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

let campIds = []; 

for (var i = 0; i < 100; i++) {
    campIds.push(i);
}

const imageSchema = new mongoose.Schema({
    userName: String,
    created: String,
    helpfulness: Number,
    caption: String,
    priority: String,
    imageUrl: String,
});

//TESTING

const popDatabase = (names) => {
    names.forEach((title) => {
        const title = mongoose.model(title, imageSchema)
    })
}