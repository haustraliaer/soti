var webpack = require("webpack");

module.exports = [
  new webpack.DefinePlugin({
    "__HOST__": JSON.stringify(process.env.HOST)
  })
]
