// var webpack = require('webpack');
import path from 'path';

export default {
  entry: './client/index.js',
  output: {
    path: path.join(__dirname, 'client/dist/'),
    filename: 'myCode.js',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: path.join(__dirname, 'client/'),
      exclude: /node_modules/,
    }],
  },
};
