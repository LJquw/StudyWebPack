const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/index.js',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
    clean: true,
    assetModuleFilename: 'images/[contenthash].[ext]' // 打包resource资源 方法1
  },

  devtool: 'inline-source-map',

  mode: 'development',

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'app.html',
      inject: 'body'
    })
  ],

  devServer: {
    static: './dist'
  },

  module: {
    rules: [
      {
        test: /\.png$/,
        type: 'asset/resource',
        generator: { // 打包resource资源 方法2
          filename: 'images/[contenthash].[ext]' // 优先级更高
        }
      },
      {
        test: /\.svg$/,
        type: 'asset/inline'
      },
      {
        test: /\.txt$/,
        type: 'asset/source'
      },
      {
        test: /\.jpg$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024 * 1024
          }
        }
      }
    ]
  }
};