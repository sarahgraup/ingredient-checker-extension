const path = require('path');
require('dotenv').config();
const HTMLPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');


const isDevelopment = process.env.REACT_APP_ENV === 'development';
const shouldGenerateSourceMap = process.env.GENERATE_SOURCEMAP === 'true';

module.exports = {
  entry: {
    index: './src/index.tsx',
    popup: './src/popup/Popup.tsx',
    serviceWorker: './src/serviceWorker.ts',
    contentScript: './src/contentScript.ts',
  },
  mode:
    process.env.REACT_APP_ENV === 'development' ? 'development' : 'production',
  devtool: shouldGenerateSourceMap ? 'source-map' : false,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              compilerOptions: { noEmit: false },
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(woff|woff2|ttf|eot|otf)$/i,
        type: 'asset/resource',

      },
      {
        exclude: /node_modules/,
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'manifest.json',
          to: path.join(__dirname, 'dist', 'manifest.json'),
        },
      ],
    }),
    new webpack.DefinePlugin({
      'process.env.REACT_APP_ENV': JSON.stringify(process.env.REACT_APP_ENV),
    }),
    ...getHtmlPlugins(['index']),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    plugins: [new TsconfigPathsPlugin()],
    alias: {
      popup: path.resolve(__dirname, 'src/popup/'),
    },
  },
  output: {
    path: path.join(__dirname, 'dist/js'),
    filename: '[name].js',
    assetModuleFilename: '[name][ext][query]',
  },
};

function getHtmlPlugins(chunks) {
  return chunks.map(
    (chunk) =>
      new HTMLPlugin({
        title: 'Codei',
        filename: `${chunk}.html`,
        chunks: [chunk],
      })
  );
}