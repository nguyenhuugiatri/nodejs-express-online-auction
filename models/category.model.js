const db = require("../utils/db");
const config = require("../config/default.json");

module.exports = {
  all: () => db.load("select * from category")
};
