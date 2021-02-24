const path = require("path")
const dev = require("./webpack.dev")
const prod = require("./webpack.prod")
const { merge } = require("webpack-merge")
const readEnv = require('./readEnv')
const webpack = require("webpack")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

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
    filename: '[name].js',
    path: join('dist/js')
  },
  resolve: {
    alias: { // 别名

    },
    extensions: ['.vue', '.ts', '.js'],
  },
  // optimization: { // 本身production 就提供默认优化
  //   splitChunks: {
  //     chunks: 'all',
  //     minSize: 1,
  //     maxSize: 10,
  //   },
  //   splitGroups: {

  //   }
  // },
  module: {
    rules: [
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
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(merge(process.env, env, assignDev)),
    }),
    new HtmlWebpackPlugin({
      title: "title",
      filename: join('dist/index.html'),
      template: join('index.html'),
      inject: "body",
      scriptLoading: "blocking"
    }),
    new CleanWebpackPlugin({cleanOnceBeforeBuildPatterns: [join('dist')]}),
  ]
}, assignConfig)

module.exports = webpackConfig