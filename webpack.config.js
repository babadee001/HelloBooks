var path = require('path');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: './client/index.js',
  output: {
    path: path.join(__dirname, 'client/dist/'),
    filename: 'output.js',
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'client/'),
        exclude: path.join(__dirname, '/node_modules/asx/js'),
      },
      { test: /(\.s?css)$/,
        loader: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};
