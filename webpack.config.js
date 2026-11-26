const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/main.jsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? 'js/[name].[contenthash:8].js' : 'js/[name].js',
      publicPath: '/',
      clean: true,
    },
    devtool: isProduction ? 'source-map' : 'eval-cheap-module-source-map',
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            // url: false keeps "/assets/..." paths as they are; those files are served from public/.
            { loader: 'css-loader', options: { url: false } },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({ template: './public/index.html' }),
      isProduction &&
        new MiniCssExtractPlugin({ filename: 'css/[name].[contenthash:8].css' }),
      isProduction &&
        new CopyWebpackPlugin({
          patterns: [{ from: 'public/assets', to: 'assets' }],
        }),
    ].filter(Boolean),
    devServer: {
      static: { directory: path.resolve(__dirname, 'public') },
      port: 3000,
      open: true,
      hot: true,
    },
  };
};
