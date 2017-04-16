const path = require('path')
const webpack = require('webpack')
/*
const htmlWebpackPlugin = require('html-webpack-plugin')
const htmlWebpackPluginConfig = new htmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
})
*/
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015'],
          plugins: ['transform-object-rest-spread']
        }
      }
    ]
  },
  plugins: [
    // htmlWebpackPluginConfig,
    new webpack.optimize.OccurrenceOrderPlugin,
  ]
}