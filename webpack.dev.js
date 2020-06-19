const common = require('./webpack.common.js');
const merge = require('webpack-merge');

module.exports = merge(common, {
  devtool: "eval-cheap-module-source-map",
  mode: 'development',
  watch: true,
  watchOptions: {
    aggregateTimeout: 200,
    poll: 1000,
    ignored: './node_modules/'
  }
});