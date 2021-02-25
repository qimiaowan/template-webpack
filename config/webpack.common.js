const path = require("path")
const dev = require("./webpack.dev")
const prod = require("./webpack.prod")
const { merge } = require("webpack-merge")
const readEnv = require('./readEnv')
const webpack = require("webpack")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const miniCssChunks = require('mini-css-extract-plugin');

const env = readEnv('.env')

let assignConfig = {}
let assignDev = {}

if(process.env.NODE_ENV === 'development') {
  assignConfig = dev
  assignDev = readEnv('.env.development')
} else if (process.env.NODE_ENV === 'production') {
  assignConfig = prod
  assignDev = readEnv('.env.production')
}

function join(cur) {
  return path.join(__dirname, '../', cur)
}

const webpackConfig = merge({
  mode: "none",
  entry: {
    main: "./src/main.js"
  },
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/chunks.[chunkhash].js',
    path: join('dist'),
    publicPath: ''
  },
  resolve: {
    alias: { // 别名

    },
    extensions: ['.vue', '.ts', '.js'],
    // modules: ['node_modules'] //查找模块位置
  },
  // externals: {
  //   jquery: 'jQuery',
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
  module: {
    // noParse: '',
    rules: [
      {
        test: /\.(eot|ttf|woff|woff2)$/i,
        generator: {
          filename: 'font/[hash][ext][query]'
        },
        type: "asset",
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        generator: {
          filename: 'image/[hash][ext][query]'
        },
        type: "asset",
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
              publicPath(resourcePath, context){
                return path.relative(path.dirname(resourcePath), context) + '/';
              },
            }
          },
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          {
            loader: "postcss-loader"
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: miniCssChunks.loader,
            options: {
              publicPath(resourcePath, context){
                return path.relative(path.dirname(resourcePath), context) + '/';
              },
            }
          },
          {
            loader: 'css-loader',
            options: { importLoaders: 2 }
          },
          {
            loader: "postcss-loader"
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require("sass"),
            },
          }
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "哈哈哈哈",
      filename: 'index.html',
      template: 'public/index.html',
      inject: "body",
      scriptLoading: "blocking"
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
      insert: 'head',
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(merge(process.env, env, assignDev)),
    }),
    new CleanWebpackPlugin({cleanOnceBeforeBuildPatterns: [join('dist')]}),
  ]
}, assignConfig)

module.exports = webpackConfig