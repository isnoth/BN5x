var webpack = require('webpack');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
//var OpenBrowserPlugin = require('open-browser-webpack-plugin');

const DefinePlugin = webpack.DefinePlugin;
const HotModuleReplacementPlugin = webpack.HotModuleReplacementPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NoErrorsPlugin = webpack.NoErrorsPlugin;
const OccurenceOrderPlugin = webpack.optimize.OccurenceOrderPlugin;


const path = require('path');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8081/', // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    './src/index.jsx',
  
  ],
  devtool: process.env.WEBPACK_DEVTOOL || 'source-map',
  output: {
    filename: 'bundle.js',
    //path: path.resolve('./www'),
    path: path.resolve('./www/'),
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
        loader: 'babel',
        exclude:/node_modules/, 
        query: {
          presets: ['es2015', 'react','stage-0' ],
          plugins: [
            ['react-transform', {
              transforms: [{
                transform: 'react-transform-hmr',
                imports: ['react'],
                locals: ['module']
              }]
            }]
          ]
        }
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.less$/, loader: "style!css!less" },
      { test: /\.png$/, loader: "url-loader?limit=100000" },
      { test: /\.jpg$/, loader: "file-loader" },
      { test: /\.json$/, loader: 'json' } // for react-markdown
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HotModuleReplacementPlugin(),
    //new CommonsChunkPlugin('init.js'),
    //new OpenBrowserPlugin({ url: 'http://localhost:8080' })
  ] ,


  devServer: {
    contentBase: './src',
    historyApiFallback: true,
    hot: true,
    port: 8081,
    progress: true,
    //publicPath: path.resolve('./target'),
    publicPath: '/',
    stats: {
      cached: true,
      cachedAssets: true,
      chunks: true,
      chunkModules: false,
      colors: true,
      hash: false,
      reasons: true,
      timings: true,
      version: false
    }
  }

}
