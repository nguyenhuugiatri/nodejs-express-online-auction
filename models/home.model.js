const db = require("../utils/db");
const config = require("../config/default.json");

module.exports = {
  //   all: () => db.load('select * from products'),
  //   allByCat: catId => db.load(`select * from products where CatID = ${catId}`),
  //   countByCat: async catId => {
  //     const rows = await db.load(`select count(*) as total from products where CatID = ${catId}`)
  //     return rows[0].total;
  //   },
  //   pageByCat: (catId, offset) => db.load(`select * from products where CatID = ${catId} limit ${config.paginate.limit} offset ${offset}`),

  getProductPriceDESC: () =>
    db.load(
      `SELECT p.id as idproduct,p.name,p.currentPrice , p.startDate, p.endDate, u.fullname ,count(b.id_product) as count from product as p LEFT JOIN user as u ON p.id_bidder = u.id LEFT JOIN biddinglist as b ON p.id = b.id_product where p.auctioned = 0 GROUP BY p.id ORDER BY p.currentPrice DESC LIMIT 5`
    ),
  getProductEndateDESC: () =>
    db.load(
      `SELECT p.id as idproduct,p.name,p.currentPrice, p.startDate , p.endDate, u.fullname ,count(b.id_product) as count from product as p LEFT JOIN user as u ON p.id_bidder = u.id LEFT JOIN biddinglist as b ON p.id = b.id_product where p.auctioned = 0 GROUP BY p.id ORDER BY p.endDate ASC LIMIT 5`
    ),
  getProductBiddDESC: () =>
    db.load(
      `SELECT p.id as idproduct,p.name,p.currentPrice , p.startDate , p.endDate, u.fullname ,count(b.id_product) as count from product as p LEFT JOIN user as u ON p.id_bidder = u.id LEFT JOIN biddinglist as b ON p.id = b.id_product where p.auctioned = 0 GROUP BY p.id ORDER BY count DESC LIMIT 5`
    ),
  getProductPriceBuyDESC: id =>
    db.load(`SELECT * FROM product ORDER BY buynowPrice DESC LIMIT 5`),
  getCategories: () => db.load(`select * from category`),
  getCountOfBidding: idProduct =>
    db.load(`select * from biddinglist where id_product = ${idProduct}`),

  upProductBidding: (idProduct, idUser, bidPrice) =>
    db.load(
      `update product set id_bidder=${idUser} , currentPrice=${bidPrice} where id = ${idProduct}`
    ),
  upBiddingList: (idProduct, time, bidPrice, idUser) =>
    db.load(
      `INSERT INTO biddinglist values(${idProduct},'${time}',${bidPrice},${idUser})`
    ),
  getProductCurrent: id => db.load(`select * from product where id = ${id}`),
  upgradeUser: id => db.load(`update user set request = 1 where id = ${id}`),
  getInforUser: id => db.load(`select * from user where id = ${id}`),
  deleteBiddingUser: (idProduct, idUser) =>
    db.load(
      `DELETE FROM biddinglist WHERE id_product = ${idProduct}  and id_user=${idUser}`
    ),
  banBidder: (idProduct, idUser) =>
    db.load(`INSERT into ban values (${idProduct},${idUser})`),
  getBidPriceMax: idProduct =>
    db.load(
      `select * from biddinglist where id_product = ${idProduct} order by bidPrice DESC`
    ),
  UpdateProduct: (idProduct, idUser, bidPrice) =>
    db.load(
      `UPDATE product SET id_bidder = ${idUser}, currentPrice=${bidPrice} where id = ${idProduct}`
    ),
  CheckBanUser : (idUser,idProduct) => db.load(`select * from ban where id_user =${idUser} and id_product =${idProduct}`),
  //   add: entity => db.add('products', entity),
  //   del: id => db.del('products', { ProID: id }),
  //   patch: entity => {
  //     const condition = { ProID: entity.ProID };
  //     delete entity.ProID;
  //     return db.patch('products', entity, condition);
  //   }
  getThumbnailByID: async id_product => {
    const rows = await db.load(
      `select src
  from image
  where image.id_product = ${id_product};`
    );
    if (rows.length === 0) return null;
    return rows[0];
  }
};
