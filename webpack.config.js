const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.tsx'
  },
  output: {
    path: `${__dirname}/build`,
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader'
      }
    ]
  },
  plugins: [
    new CopyPlugin([
      { from: 'src/index.html', to: 'index.html' },
      { from: 'src/style.css', to: 'style.css' },
      { from: 'src/manifest.json', to: 'manifest.json' },
      { from: 'src/serviceworker.js', to: 'serviceworker.js' },
      { from: 'src/img', to: 'img' }
    ])
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  performance: { hints: false }
};
