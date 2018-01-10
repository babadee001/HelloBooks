const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'source-map',
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new CleanWebpackPlugin(['client/']),
    new webpack.EnvironmentPlugin([
      'FIREABSE_DOMAIN',
      'FIREBASE_MESSENGERID',
      'FIREBASE_APIKEY',
      'FIREBASE_URL',
      'FIREBASE_PROJECTID',
      'FIREBASE_STORAGEBUCKET'
    ]),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: false
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Hammer: 'hammerjs/hammer'
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      }
    })
  ]
});
