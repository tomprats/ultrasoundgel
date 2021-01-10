module.exports = {
  plugins: [
    "@babel/plugin-transform-proto-to-assign",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-export-default-from",
    "@babel/plugin-proposal-export-namespace-from"
  ],
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: ["last 2 versions"],
        }
      }
    ],
    "@babel/preset-react"
  ]
}
