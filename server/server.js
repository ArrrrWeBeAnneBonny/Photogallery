const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 3004;
// const database = require(__dirname + '/../database/database.js')

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// app.use(cors({
//   origin: '*'
// }));

app.get('/', (req, res) => {
  console.log('hello world');
  // res.sendFile('/Users/michaelgallien/HackReactor/FEC/photogallery/client/dist/index.html');
});

// path.join(__dirname + '/../client/dist/index.html')


app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
})