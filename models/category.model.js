const db = require("../utils/db");
const config = require("../config/default.json");

module.exports = {
  all: () => db.load("select id, name from category where status = 1"),
  allWithNumberOfProducts: () =>
    db.load(
      `select c.id, c.name, count(p.category) as quantity from category as c LEFT JOIN product as p ON p.category = c.id where status = 1 group by c.id`
    ),
  del: id => db.load(`update category set status = 0 where id = ${id}`),
  singleByName: async name => {
    const rows = await db.load(`select * from category where name = '${name}'`);
    if (rows.length === 0) return null;
    return rows[0];
  },
  add: entity => db.add("category", entity)
};
