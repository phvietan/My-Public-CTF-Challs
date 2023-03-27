const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    main: path.join(__dirname, '..', 'js', 'main.js'),
    worker: path.join(__dirname, '..', 'js', 'index.js'),
  },
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: '[name].js',
  },
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
  },
};
