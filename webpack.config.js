var path = require( 'path' );

module.exports = {
	entry: {
		'app': [
			'./web.js',
		],
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loaders: [ 'babel' ],
			},
		],
	},
	output: {
		path: __dirname,
		publicPath: '/',
		filename: '[name].js',
	},
	externals: {
		react: 'React',
		'react-dom': 'ReactDOM',
	},
	node: {
		buffer: false,
	},
	resolve: {
		extensions: [
			'',
			'.web.js',
			'.js',
			'.web.jsx',
			'.jsx',
		],
	},
	devtool: 'cheap-module-source-map',
};
