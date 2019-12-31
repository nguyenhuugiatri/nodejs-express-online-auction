const db = require("./../utils/db");

module.exports = {
  // all: () => db.load("select * from users"),
  // single: id => db.load(`select * from users where f_ID = ${id}`),
  // single: id => db.load(`select * from users where id = ${id}`),
  singleByUsername: async (username) => {
    const rows = await db.load(
      `select * from user where username = '${username}'`
    );
    if (rows.length === 0) return null;

    return rows[0];
  },

  add: entity => db.add('user', entity),
  del: id => db.del('user', { f_ID: id }),






  // add: entity => db.add("users", entity),
  // del: id => db.del("users", { f_ID: id })
};
