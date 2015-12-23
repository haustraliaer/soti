var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var cssVars = require('postcss-simple-vars')
var cssMixins = require('postcss-mixins')
var joinEntry = require("./config/joinEntry")

module.exports = function(options) {

	// ENTRY ------------------------------------------->

	var appPath = path.join(__dirname, 'app_source/');
	var hostname = process.env.HOSTNAME || "localhost";

	var entry = {
		home: appPath + 'home/Entry.js',
		powder: appPath + 'powder/Entry.js',
		admin: appPath + 'admin/Entry.js',
		core: [
			'reflux',
			'xhr',
			'react',
			'lodash',
			'fastclick',
			'velocity-animate',
			path.join(__dirname, 'assets/css/reset'),
			path.join(__dirname, '_shared/libs/amcharts'),
			path.join(__dirname, '_shared/xch-Portal'),
		]
	}

	// LOADERS ------------------------------------------->
	var cssModuleLoader = 'css-loader?modules&importLoaders=1&localIdentName=[local]__[hash:base64:5]!postcss-loader'
	var cssLegacyLoader = 'css-loader!postcss-loader'


	var loaders = [
		{
			include: /\.(js|jsx)$/,
			loader: options.devServer ? 'react-hot!babel' : 'babel',
			exclude: /node_modules/
		},
		{
			include: /\.css$/,
			loader: (options.stylesheet) ? ExtractTextPlugin.extract('style-loader', cssModuleLoader) : 'style-loader!' + cssModuleLoader
		},
		{
			include: /\.scss$/,
			loader: (options.stylesheet) ? ExtractTextPlugin.extract('style-loader', cssLegacyLoader) : 'style-loader!' + cssLegacyLoader
		},
		{
			include: /\.json$/,
			loader: 'json-loader'
		},
		{
			include: /\.(txt|svg)$/,
			loader: 'raw-loader'
		},
		{
			include: /\.html$/,
			loader: 'html-loader'
		},	{
			include: /\.(md|markdown)$/,
			loaders: ['html-loader', 'markdown-loader']
		},
		{
			include: /\.(png|jpg|jpeg|gif|woff)$/,
			loader: 'url-loader?limit=10000&name=[name]__[hash].[ext]'
		},
	]

	// PLUGINS ------------------------------------------->

	var plugins = [
		new webpack.optimize.CommonsChunkPlugin('core', 'core.bundle.js'),
	  new webpack.DefinePlugin({
	    __HOST__: JSON.stringify(process.env.HOST),
			__CLIENT__: !options.prerender,
			__SERVER__: options.prerender,
			'process.env': {
				NODE_ENV: (options.minimize) ? JSON.stringify("production") : JSON.stringify("development")
			}
	  }),
	]


	// OPTIONS ------------------------------------------->

	if(options.devServer) {

		entry = joinEntry([
			"webpack-dev-server/client?http://" + hostname + ":8080",
			"webpack/hot/only-dev-server"
		], entry)

		plugins.push(
		  new webpack.NoErrorsPlugin(),
			new webpack.HotModuleReplacementPlugin()
		)
	}

	if(options.stylesheet) {
		plugins.push(new ExtractTextPlugin("[name].css"));
	}

	// PRODUCTION --------------- >

	if(options.minimize) {
		plugins.push(
			new webpack.optimize.OccurenceOrderPlugin(),
			new webpack.optimize.UglifyJsPlugin(),
			new webpack.optimize.DedupePlugin()
		);
	}

	return {
		entry: entry,
		module: {
			loaders: loaders
		},
		plugins: plugins,
		devServer: (!options.devServer) ? undefined : {
			publicPath: "http://" + hostname + ":8080/",
			contentBase: path.join(__dirname, 'server/public'),
			hot:         true,
			inline:      true,
			lazy:        false,
			quiet:       true,
			noInfo:      false,
			headers:     {"Access-Control-Allow-Origin": "*"},
			stats:       {colors: true},
			host:        hostname
		},
		output:  {
			path: path.join(__dirname, 'server/public'),
			filename: '[name].js',
			chunkFilename: (options.devServer ? '[id].js' : '[name].js'),
			publicPath: (options.devServer) ? "http://" + hostname + ":8080/" : '/Content/',
			hotUpdateMainFilename: (options.devServer) ? "update/[hash]/update.json" : undefined,
			hotUpdateChunkFilename: (options.devServer) ? "update/[hash]/[id].update.js" : undefined,
		},
		target: 'web',
		devtool: options.devtool,
		cache: options.devServer,
		debug: options.debug,
		context: __dirname,
		resolve: {
			modulesDirectories: [
				'./assets',
		    '_shared',
				'_shared/api',
		    '_shared/components',
				'_shared/data',
		    '_shared/legacy',
				'_shared/libs',
				'_shared/mixins',
				'_shared/reports',
		    '_shared/stores',
				'_shared/utils',
				'node_modules',
			],
			extensions: ['', '.json', '.js', '.jsx', '.css']
		},
		node:    {
			__dirname: true,
			fs: 'empty'
		},
		postcss: [
		  cssMixins({
		    mixinsDir: path.join(__dirname, '../Frontend/assets/css/mixins/')
		  }),
		  cssVars({
		    variables: function () {
		      return require('../Frontend/assets/css/variables.js');
		    }
		  }),
		  require('postcss-color-function')(),
		  require('postcss-inline-comment'),
		  require('postcss-nested'),
		  require('autoprefixer-core'),
		],
	}
}
