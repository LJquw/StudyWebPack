const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');  // 抽离css插件
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); // 压缩css插件
const TerserPlugin = require('terser-webpack-plugin'); // 压缩代码插件
const toml = require('toml');
const yaml = require('yaml');
const json5= require('json5');

module.exports = {
  entry:{
    // 代码分离防止重复 第二种方式
    // index:{
    //   import:'./src/index.js',
    //   dependOn:'shared'
    // },
    // another:{
    //   import:'./src/another-module.js',
    //   dependOn:'shared'
    // },
    // shared:'lodash'

    // 代码分离多入口 第二方式
    index:'./src/index.js',
    another:'./src/another-module.js'
  },

  output: {
    path: path.resolve(__dirname, '../dist'),
    clean: true,
    assetModuleFilename: 'images/[contenthash].[ext]', // 打包resource资源 方法1
    publicPath: "/",
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'app.html',
      inject: 'body'
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/[contenthash].css'
    }),
  ],

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
      },
      { // 加载css插件
        test: /\.(css|less)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
      },
      { // 加载字体
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
      },
      { // 加载csv数据
        test: /\.(csv|tsv)$/,
        use: 'csv-loader',
      },
      { // 加载xml数据
        test: /\.xml$/,
        use: 'xml-loader',
      },
      { // 加载toml文件
        test: /\.toml$/,
        type: 'json',
        parser: {
          parse: toml.parse
        }
      },
      { // 加载yaml文件
        test: /\.yaml$/,
        type: 'json',
        parser: {
          parse: yaml.parse
        }
      },
      { // 加载json5文件
        test: /\.json5$/,
        type: 'json',
        parser: {
          parse: json5.parse
        }
      },
      { // 加载js文件
        test:/\.js$/,
        exclude:/node_modules/,
        use:{
          loader: 'babel-loader',
          options:{
            presets:['@babel/preset-env'],
            plugins:[
              [
                '@babel/plugin-transform-runtime'
              ]
            ]
          }
        }
      },
    ]
  },

  optimization:{ // 优化配置
    splitChunks:{
      chunks:'all', // 分离代码第二种方式 要与第一种方式结合

      cacheGroups:{ // 缓存第三方库
        vendor:{
          test:/[\\/]node_modules[\\/]/,
          name:'vendors',
          chunks:'all'
        }
      },
    }
  }
};