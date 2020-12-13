require("dotenv").config();
const nodeExternals = require("webpack-node-externals");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  externals: [nodeExternals()],
  optimization: { minimize: false },
  mode: "development",
  node: {
    global: false,
    __filename: false,
    __dirname: true,
  },
  devtool: "source-map",
  plugins: [
    new CleanWebpackPlugin({ verbose: true }),
    new CopyPlugin({
      patterns: [{ from: "**/*.graphql", to: "[name].[ext]" }],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.graphql$/,
        exclude: /node_modules/,
        loader: "@graphql-tools/webpack-loader",
      },
    ],
  },
};
