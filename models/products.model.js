const db = require("../utils/db");
const config = require("../config/default.json");

module.exports = {
  getProductByID: id =>
    db.load(
      `select p.name as name ,i.src,p.id, p.startDate ,p.bidStep, p.endDate , p.currentPrice , u.fullname , p.buynowPrice, p.details from product as p,user as u , image i where u.id = p.id_seller and p.id = i.id_product and p.id ='${id}'`
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
  getListHistoryProduct: id =>
    db.load(
      `select * from biddinglist as b , user as u where b.id_user= u.id and b.id_product=${id}`
    ),
  getAuctioningProductsBySellerID: idSeller =>
    db.load(
      `select * from product where id_seller = ${idSeller} and auctioned = 0;`
    ),
  getProductsEndBid: async () => {
    const rows = db.load(
      "select * from product where endDate < NOW() and isSentMailEndBid = 0"
    );
    if (rows.length === 0) return null;
    return rows;
  },

  getBidderOfProduct: async id => {
    const rows = await db.load(
      `select * from user u, product p where u.id = p.id_bidder and p.id = ${id}`
    );
    if (rows.length === 0) return null;
    return rows[0];
  },
  getSellerOfProduct: async id => {
    const rows = await db.load(
      `select * from user u, product p where u.id = p.id_seller and p.id = ${id}`
    );
    if (rows.length === 0) return null;
    return rows[0];
  },
  updateIsSentEmail: id => {
    db.load(`update product set isSentMailEndBid = 1 where id = ${id}`);
  },
  updateAuctionedStatus: id => {
    db.load(`update product set auctioned = 1 where id = ${id}`);
  }
};
