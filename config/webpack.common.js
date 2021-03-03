const path = require('path')
const dev = require('./webpack.dev')
const prod = require('./webpack.prod')
const { merge } = require('webpack-merge')
const readEnv = require('./readEnv')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const miniCssChunks = require('mini-css-extract-plugin')
// vue配置
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const env = readEnv('.env')

let assignConfig = {}
let assignDev = {}

if (process.env.NODE_ENV === 'development') {
	assignConfig = dev
	assignDev = readEnv('.env.development')
} else if (process.env.NODE_ENV === 'production') {
	assignConfig = prod
	assignDev = readEnv('.env.production')
}

function join(cur) {
	return path.join(__dirname, '../', cur)
}

const config = {
	mode: 'none',
	entry: {
		main: './src/main.js'
	},
	output: {
		filename: 'js/[name].js',
		chunkFilename: 'js/chunks.[chunkhash].js',
		path: join('dist'),
		publicPath: ''
	},
	resolve: {
		alias: {
			// 别名
		},
		extensions: ['.vue', '.ts', '.js']
		// modules: ['node_modules'] //查找模块位置
	},
	// externals: {
	// },
	// optimization: { // 本身production 就提供默认优化
	// splitChunks: {
	//   chunks: 'all',
	//   minSize: 1,
	//   maxSize: 1,
	// },
	// splitGroups: {
	// }
	// },
	optimization: {
		splitChunks: {
			cacheGroups: {
				defaultVendors: {
					name: 'chunk-vendors',
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
					chunks: 'initial'
				},
				common: {
					name: 'chunk-common',
					minChunks: 2,
					priority: -20,
					chunks: 'initial',
					reuseExistingChunk: true
				}
			}
		}
	},
	module: {
		// noParse: '',
		rules: [
			{
				test: /\.(eot|ttf|woff|woff2)$/i,
				generator: {
					filename: 'font/[hash][ext][query]'
				},
				type: 'asset'
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				generator: {
					filename: 'image/[hash][ext][query]'
				},
				type: 'asset'
			},
			{
				test: /\.css$/i,
				use: [
					// {
					//   loader: 'style-loader',
					//   options: {
					//     // injectType: 'linkTag' ,
					//     insert: 'head'
					//   }
					// },
					// 'file-loader'
					{
						loader: miniCssChunks.loader,
						options: {
							publicPath(resourcePath, context) {
								return path.relative(path.dirname(resourcePath), context) + '/'
							}
						}
					},
					{
						loader: 'css-loader',
						options: { importLoaders: 1 }
					},
					{
						loader: 'postcss-loader'
					}
				]
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					{
						loader: miniCssChunks.loader,
						options: {
							publicPath(resourcePath, context) {
								return path.relative(path.dirname(resourcePath), context) + '/'
							}
						}
					},
					{
						loader: 'css-loader',
						options: { importLoaders: 2 }
					},
					{
						loader: 'postcss-loader'
					},
					{
						loader: 'sass-loader',
						options: {
							implementation: require('sass')
						}
					}
				]
			},
			{
				enforce: 'pre', // 优先执行 前置
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: [
					{
						loader: 'eslint-loader',
						options: {
							// fix: true,
							emitWarning: false,
							emitError: false
						}
					}
				]
			},
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: [
					{
						loader: 'babel-loader'
					}
				]
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: process.env.title || '哈哈哈哈',
			filename: 'index.html',
			template: 'public/index.html',
			inject: 'body',
			scriptLoading: 'blocking'
		}),
		// new PreloadPlugin({
		//   rel: 'preload',
		//   include: 'initial',
		//   fileBlacklist: [
		//     /\.map$/,
		//     /hot-update\.js$/
		//   ]
		// }),
		// new PreloadPlugin({
		//   rel: 'prefetch',
		//   include: 'asyncChunks'
		// }),
		new miniCssChunks({
			filename: 'css/[name].[contenthash].css',
			chunkFilename: 'css/[id].[contenthash].css',
			insert: 'head'
		}),
		new VueLoaderPlugin(),
		new webpack.DefinePlugin({
			'process.env': JSON.stringify(merge(process.env, env, assignDev))
		}),
		new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: [join('dist')] })
	]
}

// vue配置

const webpackConfig = merge(config, assignConfig)

module.exports = webpackConfig
