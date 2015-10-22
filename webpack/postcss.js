var cssVars = require('postcss-simple-vars')
var cssMixins = require('postcss-mixins')
var path = require("path")

module.exports = [
  cssMixins({
    mixinsDir: path.join(__dirname, '../Frontend/css/mixins/')
  }),
  cssVars({
    variables: function () {
      return require('../Frontend/css/variables.js');
    }
  }),
  require('postcss-color-function')(),
  require('postcss-inline-comment'),
  require('postcss-nested'),
  require('autoprefixer-core'),
]
