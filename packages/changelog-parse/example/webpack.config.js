const path = require('path');

module.exports = {
  context: __dirname,
  entry: './index.js',
  output: {
    path: './dist',
    filename: 'bundle.js',
  },
  resolveLoader: {
    modules: ['../', 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
      },

      {
        test: /\.md?$/,
        loader: 'readme-loader',
        include: [
          path.resolve(__dirname, 'samples')
        ],
      },
    ],
  }
}
