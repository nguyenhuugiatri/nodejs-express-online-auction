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

  getProductPriceDESC: id => db.load(`SELECT * FROM product ORDER BY currentPrice DESC LIMIT 5`),
  getProductEndateDESC: id => db.load(`SELECT * FROM product ORDER BY endDate DESC LIMIT 5`),
  getProductBiddDESC: id => db.load(`SELECT * FROM product ORDER BY bidStep DESC LIMIT 5`)
//   add: entity => db.add('products', entity),
//   del: id => db.del('products', { ProID: id }),
//   patch: entity => {
//     const condition = { ProID: entity.ProID };
//     delete entity.ProID;
//     return db.patch('products', entity, condition);
//   }
};
