const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    main: path.join(__dirname, '..', 'js', 'main.js'),
    worker: path.join(__dirname, '..', 'js', 'index.js'),
  },
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: '[name].js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    moduleIds: 'natural',
    concatenateModules: true,
    mangleExports: 'size',
    removeEmptyChunks: false,
  },
};
