process.env.NODE_ENV = process.env.NODE_ENV || "development"

const environment = require("./environment")
const linter = require("./loaders/linter")

environment.loaders.append("linter", linter)

module.exports = environment.toWebpackConfig()
