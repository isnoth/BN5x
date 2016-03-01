module.exports = {
  entry: './src/index.js',
  output: {
    path: './public',
    filename: 'bundle.js',
    publicPath: undefined
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}
