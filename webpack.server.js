var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var plugins = require('./webpack/plugins.js').slice()
var loaders = require('./webpack/loaders.js').slice()
var postcss = require('./webpack/postcss.js')

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

plugins.push(
  new webpack.DefinePlugin({"process.env": {NODE_ENV: '"production"'}}),
  new webpack.DefinePlugin({__CLIENT__: false, __SERVER__: true}),
  new webpack.BannerPlugin('require("source-map-support").install();', { raw: true, entryOnly: false })
)

loaders.push(
  {
    include: /\.(js|jsx)$/,
    loaders: ["babel-loader?stage=0&optional=runtime&plugins=typecheck"]
  },
  {
    include: /\.css$/,
    loaders: [
      "css/locals?modules&importLoaders=1&localIdentName=[path]__[local]___[hash:base64:5]",
      "postcss-loader"
    ],
  }
)

module.exports = {
  entry: './Frontend/Routes',
  target: 'node',
  output: {
    path: path.join(__dirname, 'Backend/public/build'),
    filename: 'routeBundle.js',
    libraryTarget: 'commonjs2'
  },
  externals: nodeModules,
  plugins: plugins,
  postcss: postcss,
  module: {
    loaders: loaders
  },
  resolve: {
    modulesDirectories: [
      'node_modules',
      './Frontend',
      './Frontend/assets',
      './Backend',
      '_shared'
    ],
    extensions: ["", ".json", ".js", ".jsx", ".css"]
  },
  devtool: 'sourcemap'
}
