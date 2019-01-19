const path = require('path');

module.exports = {
  entry: {
    app: path.join(__dirname, 'src', 'app.js'),
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public'),
  },
  resolve: {
    alias: {
      components: path.join(__dirname, 'src/components/'),
      utils: path.join(__dirname, 'src/utils/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            cacheDirectory: true,
            babelrc: false,
            presets: [
              'stage-0',
              [
                'env',
                {
                  targets: {
                    browsers: ['>0.25%', 'not ie < 9', 'not op_mini all'],
                  },
                },
              ],
            ],
            plugins: [
              'transform-runtime',
              'transform-class-properties',
              'transform-decorators-legacy',
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    overlay: true,
    stats: 'errors-only',
    compress: true,
  },
  mode: 'development',
};
