const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
  plugins: [new ESLintPlugin({emitWarning: true, failOnError: false})]
};
