 const {existsSync} = require("fs");
 const {resolve} = require("path");
 const {env} = require("shakapacker");

 const loadEnvironment = () => {
   const path = resolve(__dirname, `${env.nodeEnv}.js`);
   if(existsSync(path)) { return require(path); }

   throw new Error(`Invalid NODE_ENV (${env.nodeEnv})`);
 }

 module.exports = loadEnvironment();
