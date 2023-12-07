const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');  // 抽离css插件
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); // 压缩css插件

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
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/[contenthash].css'
    }),
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
      },
      { // 加载css插件
        test: /\.(css|less)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
      },
    ]
  },

  optimization:{ // 优化配置
    minimizer:[
      new CssMinimizerPlugin(),
    ],
}
};