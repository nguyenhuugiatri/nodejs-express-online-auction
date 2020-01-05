const db = require("../utils/db");
const config = require("../config/default.json");

module.exports = {
  all: () => db.load("select * from category"),
  allWithNumberOfProducts: () =>
    db.load(
      `select cate.id as id, cate.name as name, count(*) as quantity from product pro, category cate where pro.category=cate.id group by category`
    )
};
