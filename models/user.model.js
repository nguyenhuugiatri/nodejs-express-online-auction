const db = require("./../utils/db");

module.exports = {
  // all: () => db.load("select * from users"),
  // single: id => db.load(`select * from users where f_ID = ${}`),
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

  update: (entity, userId) => db.load(`update user  set fullname = '${entity.fullName}', email = '${entity.email}', phone = '${entity.phone}'  where id = ${userId}`),

  single: id => db.load(`select * from user where id = ${id}`),



  // add: entity => db.add("users", entity),
  // del: id => db.del("users", { f_ID: id })
};
