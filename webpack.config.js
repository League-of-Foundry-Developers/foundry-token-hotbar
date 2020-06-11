const path = require('path');

module.exports = {
    devtool: "cheap-module-eval-source-map",
    entry: './src/main.ts',
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ],
    },
    output: {
      filename: 'TokenHotbar.js',
      path: path.resolve(__dirname, '.'),
    }
  };