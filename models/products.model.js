const db = require("../utils/db");
const config = require("../config/default.json");

module.exports = {
  getProductByID: id =>
    db.load(
      `select p.name as name , p.startDate ,p.endDate , p.currentPrice , u.fullname , p.buynowPrice, p.details from product as p,user as u , image i where u.id = p.id_seller and p.id = i.id_product and p.id ='${id}'`
    ),
  getSellerProductByID: id =>
    db.load(
      `select  u.fullname from product as p,user as u , image i where u.id = p.id_seller and p.id = i.id_product and p.id = '${id}'`
    ),
  add: entity => db.add("product", entity),
  getCurrentProductId: async () => {
    const rows = await db.load(`select max(id) from product`);
    if (rows.length === 0) return null;
    return rows[0]["max(id)"];
  },
  getListHistoryProduct: id => db.load(`select * from biddinglist as b , user as u where b.id_user= u.id and b.id_product=${id}`),
  getAuctioningProductsBySellerID: idSeller =>
    db.load(
      `select * from product where id_seller = ${idSeller} and auctioned = 0;`
    )
};
