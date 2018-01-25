var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require("clean-webpack-plugin")

module.exports = {
  entry: {
    a: './src/views/a/index.js',
    login: './src/pages/login/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '../',
    filename: 'js/[name].js',
    chunkFilename: 'js/[id].chunk.js'
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize:true
              }
            },
            {
              loader: 'postcss-loader'
            }
          ]
        })
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery'
    }),
    new CleanWebpackPlugin(["dist"]),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendors',
    //   chunks: ['a'],
    //   minChunks: 3
    // }),
    new ExtractTextPlugin('css/[name].css'),
    new HtmlWebpackPlugin({
      favicon: './src/image/favicon.ico',
      filename: './pages/a.html',
      template: './src/views/a/a.html',
      inject: 'body',
      hash: true,
      chunks: ['a'],
      minify: {
        removeComments: true,
        collapseWhitespace: false
      }
    }),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './src/pages/login/index.html',
      inject: 'body',
      hash: true,
      chunks: ['login'],
      minify: {
        removeComments: true,
        collapseWhitespace: false
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './dist/',
    host: 'localhost',
    port: 8088,
    inline: true,
    hot: true,
    compress: true
  }
}
