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

  getProductPriceDESC:() => db.load(`SELECT *,count(b.id_product) as count FROM product as p LEFT JOIN user as u ON p.id_bidder = u.id LEFT JOIN biddinglist as b ON p.id = b.id_product where p.auctioned=0  group by b.id_product ORDER BY p.currentPrice DESC LIMIT 5`),
  getProductEndateDESC:() => db.load(`SELECT *,count(b.id_product) as count FROM product as p LEFT JOIN user as u ON p.id_bidder = u.id LEFT JOIN biddinglist as b ON p.id = b.id_product WHERE p.auctioned = 0 group by b.id_product ORDER BY p.endDate DESC LIMIT 5`),
  getProductBiddDESC:() => db.load(`SELECT *, count(*) as count FROM biddinglist as b, user as u, product as p where b.id_product=p.id and p.id_bidder = u.id group by b.id_product ORDER BY count DESC LIMIT 5`),
  getProductPriceBuyDESC: id => db.load(`SELECT * FROM product ORDER BY buynowPrice DESC LIMIT 5`),
  getCategories:() => db.load(`select * from category`),
  getCountOfBidding: idProduct => db.load(`select * from biddinglist where id_product = ${idProduct}`)
//   add: entity => db.add('products', entity),
//   del: id => db.del('products', { ProID: id }),
//   patch: entity => {
//     const condition = { ProID: entity.ProID };
//     delete entity.ProID;
//     return db.patch('products', entity, condition);
//   }
};
