var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var postcss = require('./webpack/postcss.js')
var plugins = require('./webpack/plugins.js').slice()
var loaders = require('./webpack/loaders.js').slice()

plugins.push(
  new ExtractTextPlugin("style.css"),
	new webpack.DefinePlugin({__CLIENT__: true, __SERVER__: false}),
	new webpack.DefinePlugin({"process.env": {NODE_ENV: '"production"'}}),
	new webpack.optimize.DedupePlugin(),
	new webpack.optimize.OccurenceOrderPlugin(),
	new webpack.optimize.UglifyJsPlugin()
)

loaders.push(
	{
		include: /\.(js|jsx)$/,
		loaders: ["babel-loader?stage=0&optional=runtime&plugins=typecheck"],
		exclude: /node_modules/
	},
	{
		include: /\.css$/,
		loader: ExtractTextPlugin.extract("style-loader",
			"css-loader?modules&importLoaders=1&localIdentName=[path]__[local]___[hash:base64:5]!postcss-loader"
		)
	}
)

module.exports = {
	target:  "web",
	cache:   false,
	context: __dirname,
	devtool: false,
	entry:   ["./Frontend/Entry.js"],
	output:  {
		path:          path.join(__dirname, "Backend/public/build"),
		filename:      "bundle.js",
		chunkFilename: "[name].[id].js",
		publicPath:    "build/"
	},
	plugins: plugins,
	postcss: postcss,
	module:  {
		loaders: loaders
	},
	resolve: {
		modulesDirectories: [
	    'node_modules',
	    './Frontend',
      './Frontend/assets',
	    './Backend',
	    '_shared',
		],
		extensions: ["", ".json", ".js", ".jsx", ".css"]
	},
	node:    {
		__dirname: true,
		fs: 'empty'
	}
};
