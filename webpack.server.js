require("dotenv").config();
const nodeExternals = require("webpack-node-externals");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
module.exports = {
  externals: [nodeExternals()],
  optimization: { minimize: false },
  mode: "development",
  plugins: [new CleanWebpackPlugin()],
};
