var webpack = require("webpack")
var config = require("./webpack.client-build.js")
var plugins = require('./webpack/plugins.js').slice()
var loaders = require('./webpack/loaders.js').slice()

var hostname = process.env.HOSTNAME || "localhost";

config.cache = true;
config.debug = true;
config.devtool = "eval";

config.entry.unshift(
	"webpack-dev-server/client?http://" + hostname + ":8080",
	"webpack/hot/only-dev-server"
);

config.output.publicPath = "http://" + hostname + ":8080/build/";
config.output.hotUpdateMainFilename = "update/[hash]/update.json";
config.output.hotUpdateChunkFilename = "update/[hash]/[id].update.js";

plugins.push(
	new webpack.DefinePlugin({__CLIENT__: true, __SERVER__: false}),
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoErrorsPlugin()
)

loaders.push(
	{
		include: /\.(js|jsx)$/,
		loaders: [
			"react-hot",
			"babel-loader?stage=0&optional=runtime&plugins=typecheck"
		],
		exclude: /node_modules/
	},
	{
		include: /\.css$/,
		loaders: [
			"style-loader",
			"css-loader?modules&importLoaders=1&localIdentName=[path]__[local]___[hash:base64:5]",
			"postcss-loader"
		],
	}
)

config.plugins = plugins
config.module.loaders = loaders

config.devServer = {
	publicPath:  "http://" + hostname + ":8080/build/",
	contentBase: "./Backend/public/",
	hot:         true,
	inline:      true,
	lazy:        false,
	quiet:       true,
	noInfo:      false,
	headers:     {"Access-Control-Allow-Origin": "*"},
	stats:       {colors: true},
	host:        hostname
};

module.exports = config;
