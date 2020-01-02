const db = require('../utils/db');
const config = require('../config/default.json');

module.exports = {
//   all: () => db.load('select * from products'),
//   allByCat: catId => db.load(`select * from products where CatID = ${catId}`),
//   countByCat: async catId => {
//     const rows = await db.load(`select count(*) as total from products where CatID = ${catId}`)
//     return rows[0].total;
//   },
//   pageByCat: (catId, offset) => db.load(`select * from products where CatID = ${catId} limit ${config.paginate.limit} offset ${offset}`),

  getProductPriceDESC:() => db.load(`SELECT * FROM product ORDER BY currentPrice DESC LIMIT 5`),
  getProductEndateDESC:() => db.load(`SELECT * FROM product ORDER BY endDate DESC LIMIT 5`),
  getProductBiddDESC:() => db.load(`SELECT * FROM product ORDER BY bidStep DESC LIMIT 5`),
  getProductPriceBuyDESC: id => db.load(`SELECT * FROM product ORDER BY buynowPrice DESC LIMIT 5`),
  getCategories:() => db.load(`select * from category`)
//   add: entity => db.add('products', entity),
//   del: id => db.del('products', { ProID: id }),
//   patch: entity => {
//     const condition = { ProID: entity.ProID };
//     delete entity.ProID;
//     return db.patch('products', entity, condition);
//   }
};
