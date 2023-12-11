const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); // 压缩css插件
const TerserPlugin = require('terser-webpack-plugin'); // 压缩代码插件

module.exports = {
  output: {
    filename:'scripts/[name].[contenthash].js', // 将js文件放到一个文件夹中
    publicPath: 'http://localhost:8080/', // 公共路径
  },

  mode: 'production',

  optimization:{ // 优化配置
    minimizer:[
      new CssMinimizerPlugin(),
      new TerserPlugin(),
    ],
  },

  performance: { // 关闭webpack提示
    hints: false,
  }
};