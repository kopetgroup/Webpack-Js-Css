/*
  Main Theme : oneui
*/
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    main          : path.resolve(__dirname, './app/main.js'),
    style         : path.resolve(__dirname, './app/css.scss'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'assets/js/[name].min.js'
  },
  //devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      },
      // {
      //  //loader nggo index.html
      //  test: /\.(html)$/,
      //  loader: 'file-loader?name=[name].[ext]'
      //},
       {
        test: /\.(html)$/,
        loaders: ['html-loader']
      },
       {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
        loader: 'file-loader?name=[name].[ext]&outputPath=/assets/fonts/'
      }, {
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'file-loader?name=/assets/images/[name].[ext]'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader'
            }, {
              // compiles Sass to CSS
              loader: 'sass-loader'
            }
          ],
          fallback: 'style-loader'
        })
      },
      // {
      //  test: /\.css$/,
      //  loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'})
      //},
       {
        test: /\.(json)$/,
        loader: 'file-loader?name=[path][name].[ext]'
      }
    ]
  },
  plugins: [
    //new webpack.optimize.CommonsChunkPlugin({name: "vendor",Infinity}),
    new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    }),
    new ExtractTextPlugin({filename: 'assets/css/style.min.css', allChunks: true, disable: false}),
    new CopyWebpackPlugin([
      //{
      //  'from': __dirname+'/index.html',
      //  'to':''
      //}
    ]),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: {
        context: __dirname
      },
      sourceMap: false
    }),
    new UglifyJSPlugin({parallel: true, mangle: false, sourceMap: false, beautify: false, comments: false})
  ],
  devServer: {
    host: "rootpixel2.com",
    publicPath: "/",
    contentBase: "../public",
    hot: false
  }
};
