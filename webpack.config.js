// var path = require('path');
// var SRC_DIR = path.join(__dirname, '/client/src');
// var DIST_DIR = path.join(__dirname, '/client/dist');

// module.exports = {
//   entry: `${SRC_DIR}/index.jsx`,
//   output: {
//     filename: 'photogallery.js',
//     path: DIST_DIR
//   },
//   module : {
//     // rules: [
//     //   {
//     //     test: /\.css$/i,
//     //     use: ["style-loader", "css-loader"],
//     //   },
//     // ],
//     loaders : [
//       // { test: /\.css$/, loader: "style-loader!css-loader" },
//       // { test: /\.css$/i, use: ['style-loader', 'css-loader']},
//       {
//         test : /\.jsx?/,
//         include : SRC_DIR,
//         loader : 'babel-loader',
//         query: {
//           presets: ['react', 'es2015']
//         }
//       },
//       {
//         test: /\.css$/i,
//         use: ['style-loader', 'css-loader']
//       }
//     ]
//   },
// };  
var path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  mode: 'development',
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'photogallery.js',
    path: DIST_DIR
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.css'
    ]
  }
};