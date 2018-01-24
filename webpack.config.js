var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    a: './src/views/a/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'js/[name].js',
    chunkFilename: 'js/[id].chunk.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('css!less')
      },
      {
        test: /\.html$/,
        loader: "html-loader" // ?attrs=img:src img:data-src
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=./fonts/[name].[ext]'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=8192&name=./img/[hash].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      chunks: ['a'],
      minChunks: 3
    }),
    new ExtractTextPlugin('css/[name].css'),
    new HtmlWebpackPlugin({
      favicon: './src/image/favicon.ico',
      filename: './pages/a.html',
      template: './src/views/a/a.html',
      inject: 'body',
      hash: true,
      chunks: ['vendors', 'index'],
      minify: {
        removeComments: true,
        collapseWhitespace: false
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './',
    host: 'localhost',
    port: 8088,
    inline: true,
    hot: true,
  }
}
