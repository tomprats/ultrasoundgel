module.exports = {
  test: /\.jsx?$/,
  exclude: /node_modules/,
  use: [{
    loader: "eslint-loader",
    options: {emitWarning: true}
  }]
}
