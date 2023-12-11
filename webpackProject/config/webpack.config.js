const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.config.common.js');
const productionConfig = require('./webpack.config.prod.js');
const developmentConfig = require('./webpack.config.dev.js');

module.exports = (env) => {
  switch(true) {
    case env.development:
      return merge(commonConfig, developmentConfig)
    case env.production:
      return merge(commonConfig, productionConfig)
    default:
      throw new Error('No matching configuration was found!');
  }
}