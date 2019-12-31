const mysql = require("mysql");
const util = require("util");
const config = require("../config/default");

const pool = mysql.createPool(config.mysql);
const mysql_query = util.promisify(pool.query).bind(pool);

module.exports = {
  load: sql => mysql_query(sql),
  add: (tableName, entity) => mysql_query(`insert into ${tableName} set ?`, entity)
  // add: (tableName, entity) =>
  //   mysql_query(`insert into ${tableName} set ?`, entity),
  // del: (tableName, condition) =>
  //   mysql_query(`delete from ${tableName} where ?`, condition),
  // patch: (tableName, entity, condition) =>
  //   mysql_query(`update ${tableName} set ? where ?`, [entity, condition])
};
