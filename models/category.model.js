const db = require("../utils/db");
const config = require("../config/default.json");

module.exports = {
  all: () => db.load("select * from category where status = 1"),
  allWithNumberOfProducts: () =>
    db.load(
      `select cate.id as id, cate.name as name, count(*) as quantity from product pro, category cate where pro.category=cate.id and cate.status = 1 group by category`
    ),
    del: id => db.load(`update category set status = 0 where id = ${id}`),
};
