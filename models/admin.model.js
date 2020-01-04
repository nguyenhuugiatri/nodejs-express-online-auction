const db = require("../utils/db");
const config = require("../config/default.json");

module.exports = {
  singleByUsername: async username => {
    const rows = await db.load(
      `select * from admin where username = '${username}'`
    );
    if (rows.length === 0) return null;
    return rows[0];
  }
};
