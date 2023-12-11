const path = require('path');

module.exports = {
  output: {
    filename:'scripts/[name].js', // 将js文件放到一个文件夹中
  },

  //开启sourcemap 开发中推荐使用'source-map' 生产环境一般不开启sourcemap 
  devtool:'source-map',

  mode: 'development',

  devServer: {
    // static: './dist'
    static: path.resolve(__dirname, './dist'),
    compress: true, // 可选择开启gzips压缩功能
    port: '3000', // 运行端口号
    headers:{
      'X-Access-Token':'123213' // 自定义头部
    },
    proxy:{
      '/api':'http://localhost:9000' // 配置代理
    },
    // https:true, // 设置https协议
    http2:true, 
    historyApiFallBack: true,
    host:'0.0.0.0',  //如果在开发环境中启动了一个devserve服务，并期望其他人能访问到，只需要配置该项即可
    
    hot:true, // 热替换
    liveReload:true, // 热加载 新版webpack-dev-server默认已经开启热加载功能
  },
};