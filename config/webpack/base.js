const {merge, webpackConfig} = require("shakapacker");
const webpack = require("webpack");

const customConfig = {
  plugins: [
    new webpack.ProvidePlugin({"React": "react"})
  ],
  resolve: {
    extensions: [".css", ".scss"]
  }
};

webpackConfig.module.rules.map((module) => {
  if(module.test && module.test.toString().includes("scss")) {
    module.use.splice(-1, 0, {loader: require.resolve("resolve-url-loader")});
  }
  return module;
});

module.exports = merge(webpackConfig, customConfig);
