require("ts-node/register");
const config = require("../config/database.ts").default || require("../config/database.ts");

module.exports = config;
