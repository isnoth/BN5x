var webpack = require('webpack');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
const DefinePlugin = webpack.DefinePlugin;
//var OpenBrowserPlugin = require('open-browser-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.jsx',
  devtool: process.env.WEBPACK_DEVTOOL || 'source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve('./www'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: path.resolve('./src') //set root folder
  },
  module: {
    loaders:[
      { 
        test: /\.js[x]?$/, 
        loader: 'babel-loader',
        exclude:/node_modules/, 
        query: {
          presets: ['es2015', 'react','stage-0' ]
        }
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.png$/, loader: "url-loader?limit=100000" },
      { test: /\.jpg$/, loader: "file-loader" },
      { test: /\.json$/, loader: 'json' } // for react-markdown
    ]
  },
  plugins: [
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    //new CommonsChunkPlugin('init.js'),
    //new OpenBrowserPlugin({ url: 'http://localhost:8080' })
  ] ,

}
