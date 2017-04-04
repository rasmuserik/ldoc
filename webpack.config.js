module.exports = {
  entry: './ldoc.js',
  devtool: 'source-map',
  module: { loaders: [
    { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
  ]},
  output: {
    filename: 'dist.js'
  }
}
