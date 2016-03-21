const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    './web/js/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/web/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: path.join(__dirname, 'web', 'js')
      },
      {
        test: /\.styl$/,
        loader: 'style!css?modules!stylus'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.ico$/,
        exclude: /node_modules/,
        loader: 'file-loader?name=img/[path][name].[ext]&context=./web/img'
      }
    ]
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      'Promise': 'es6-promise',
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ]
};
