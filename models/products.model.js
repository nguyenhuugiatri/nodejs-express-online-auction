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

  getProductByID: id => db.load(`select p.name as name , p.startDate ,p.endDate , p.currentPrice , u.fullname , p.buynowPrice, p.details from product as p,user as u , image i where u.id = p.id_bidder and p.id = i.id_product and p.id ='${id}'`),
  getSellerProductByID: id => db.load(`select  u.fullname from product as p,user as u , image i where u.id = p.id_seller and p.id = i.id_product and p.id = '${id}'`)
//   add: entity => db.add('products', entity),
//   del: id => db.del('products', { ProID: id }),
//   patch: entity => {
//     const condition = { ProID: entity.ProID };
//     delete entity.ProID;
//     return db.patch('products', entity, condition);
//   }
};
