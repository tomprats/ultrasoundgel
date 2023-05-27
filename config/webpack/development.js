process.env.NODE_ENV = process.env.NODE_ENV || "development";

const {merge} = require("shakapacker");
const webpackConfig = require("./base");
const linterConfig = require("./custom/linter");

module.exports = merge(webpackConfig, linterConfig);
