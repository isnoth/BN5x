var webpack = require('webpack');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
//var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  entry: './src/index.jsx',
  devtool: process.env.WEBPACK_DEVTOOL || 'source-map',
  output: {
    publicPath: "http://127.0.0.1:8080/www/",
    path: './www/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders:[
      { 
        test: /\.jsx$/, 
        loader: 'babel-loader',
        exclude:/node_modules/, 
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  plugins: [
    //new CommonsChunkPlugin('init.js'),
    //new OpenBrowserPlugin({ url: 'http://localhost:8080' })
  ]
}
