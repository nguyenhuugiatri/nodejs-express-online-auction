const db = require("./../utils/db");

module.exports = {
  all: () => db.load("select * from user where status = 1"),
  // single: id => db.load(`select * from users where f_ID = ${}`),
  // single: id => db.load(`select * from users where id = ${id}`),
  singleByUsername: async username => {
    const rows = await db.load(
      `select * from user where status = 1 and username = '${username}'`
    );
    if (rows.length === 0) return null;
    return rows[0];
  },
  singleByEmailUsername: async (username, email) => {
    const rows = await db.load(
      `select * from user where username = '${username}' or email = '${email}'`
    );
    if (rows.length === 0) return null;
    return rows[0];
  },

  add: entity => db.add("user", entity),
  del: id => db.del("user", { f_ID: id }),

  update: (entity, userId) =>
    db.load(
      `update user  set fullname = '${entity.fullName}', email = '${entity.email}', phone = '${entity.phone}'  where id = ${userId}`
    ),

  changePass: (hashedPassword, userId) =>
    db.load(
      `update user  set password = '${hashedPassword}' where id = ${userId}`
    ),

  checkWishList: (idUser, idProduct) =>
    db.load(
      `select * from watchlist where id_user=${idUser} and id_product=${idProduct}`
    ),
  addWishList: (idUser, idProduct) =>
    db.load(`insert into watchlist values(${idUser},${idProduct})`),
  deleteWishList: (idUser, idProduct) =>
    db.load(
      `delete from watchlist where id_user=${idUser} and id_product=${idProduct}`
    ),
  getWishListbyID: idUser =>
    db.load(
      `SELECT p.id as idproduct,p.name,p.currentPrice , p.startDate, p.endDate, u.fullname ,count(b.id_product) as count  FROM watchlist as w LEFT JOIN product as p ON w.id_product = p.id LEFT JOIN user as u ON p.id_bidder = u.id LEFT JOIN biddinglist as b ON w.id_product = b.id_product where w.id_user=${idUser} and p.auctioned=0 GROUP BY w.id_product`
    ),
  getWishListbyID_Name: (idUser, name) =>
    db.load(
      `SELECT p.id as idproduct,p.name,p.currentPrice , p.startDate, p.endDate, u.fullname ,count(b.id_product) as count  FROM watchlist as w LEFT JOIN product as p ON w.id_product = p.id LEFT JOIN user as u ON p.id_bidder = u.id LEFT JOIN biddinglist as b ON w.id_product = b.id_product where w.id_user=${idUser} and p.auctioned=0 and p.name like '%${name}%' GROUP BY w.id_product`
    ),
  getListProductOfSeller: idSeller =>
    db.load(
      `SELECT p.id as idproduct,p.name,p.currentPrice , p.startDate, p.endDate, u.fullname ,count(b.id_product) as count from product as p LEFT JOIN user as u ON p.id_bidder = u.id LEFT JOIN biddinglist as b ON p.id = b.id_product where p.id_seller=${idSeller} and p.auctioned = 0 GROUP BY p.id`
    ),
  getListProductOfBidding: idBidder =>
    db.load(
      `SELECT p.id as idproduct,p.name,p.currentPrice , p.startDate, p.endDate, u.fullname from biddinglist as b LEFT JOIN product as p ON b.id_product = p.id LEFT JOIN user as u ON b.id_user = u.id where p.auctioned=0 and u.id=${idBidder} group by p.id`
    ),
  getUserTakeNowProduct: idUser =>
    db.load(`select * from product where id_bidder=${idUser}`),

  singleByID: id => db.load(`select * from user where id = ${id}`), //////// làm sao thay thế cho #each trong profile và edit và changePassword
  singleRowByID: async id => {
    const rows = await db.load(`select * from user where id = '${id}'`);
    if (rows.length === 0) return null;

    return rows[0];
  },

  checkWishList: (idUser, idProduct) =>
    db.load(
      `select * from watchlist where id_user=${idUser} and id_product=${idProduct}`
    ),
  addWishList: (idUser, idProduct) =>
    db.load(`insert into watchlist values(${idUser},${idProduct})`),
  deleteWishList: (idUser, idProduct) =>
    db.load(
      `delete from watchlist where id_user=${idUser} and id_product=${idProduct}`
    ),

  getNumberOfReviews: async idUser => {
    const rows = await db.load(
      `select count(*) as "number_of_reviews" from review where id_user=${idUser};`
    );
    if (rows.length === 0) return null;
    return rows[0];
  },
  getBiddingCount : ()=> db.load(`select * , count(id_product) as count from biddinglist group by id_product`),

  getNumberOfPositiveReviews: async idUser => {
    const rows = await db.load(
      `select count(*) as "positive_reviews" from review where id_user=${idUser} and marks = 1;`
    );
    if (rows.length === 0) return null;
    return rows[0];
  },

  // add: entity => db.add("users", entity),
  // del: id => db.del("users", { f_ID: id })

  getListProductOfWon: idBidder =>
    db.load(`select product.*, user.username as winner, user2.username as seller
  from product, user, user as user2
  WHERE product.id_bidder = user.id and product.id_seller = user2.id
  and user.id = ${idBidder}
  and auctioned=1;`),
  getListProductAuctioned: idSeller =>
    db.load(`select product.*, user.username as winner, user2.username as seller
  from product, user, user as user2
  WHERE product.id_bidder = user.id and product.id_seller = user2.id
  and user2.id = ${idSeller}
  and auctioned=1;`),

  getListProductOfWonFromYou: (userId, yourID) =>
    db.load(`select product.*, user.username as winner, user2.username as seller
  from product, user, user as user2
  WHERE product.id_bidder = user.id and product.id_seller = user2.id
  and user.id = ${userId}
  and user2.id = ${yourID}
  and auctioned=1;`),
  getListProductAuctionedForYou: (userId, yourID) =>
    db.load(`select product.*, user.username as winner, user2.username as seller
  from product, user, user as user2
  WHERE product.id_bidder = user.id and product.id_seller = user2.id
  and user.id = ${yourID}
  and user2.id = ${userId}
  and auctioned=1;`),

  isReviewedBySellerYou: async (id_product, id_seller) => {
    const rows = await db.load(
      `select *
      from review, product
      where review.id_product = product.id
      and review.reviewer = product.id_seller
      and product.id_seller = ${id_seller}
      and product.id = ${id_product}
      and product.auctioned=1 ;`
    );
    if (rows.length === 0) return null;
    return rows[0];
  },

  isReviewedBySeller: async id_product => {
    const rows = await db.load(
      `select *
      from review, product
      where review.id_product = product.id
      and review.reviewer = product.id_seller
      and product.id = ${id_product}
      and product.auctioned=1 ;`
    );
    if (rows.length === 0) return null;
    return rows[0];
  },

  isReviewedByWinnerYou: async (id_product, id_winner) => {
    const rows = await db.load(
      `select *
      from review, product
      where review.id_product = product.id
      and review.reviewer = product.id_bidder
      and product.id_bidder = ${id_winner}
      and product.id = ${id_product}
      and product.auctioned=1 ;`
    );
    if (rows.length === 0) return null;
    return rows[0];
  },

  isReviewedByWinner: async id_product => {
    const rows = await db.load(
      `select *
      from review, product
      where review.id_product = product.id
      and review.reviewer = product.id_bidder
      and product.id = ${id_product}
      and product.auctioned=1 ;`
    );
    if (rows.length === 0) return null;
    return rows[0];
  },

  getIDSeller: async id_product => {
    const rows = await db.load(
      `select id_seller
      from product
      where product.id = ${id_product};`
    );
    if (rows.length === 0) return null;
    return rows[0];
  },

  getIDWinner: async id_product => {
    const rows = await db.load(
      `select id_bidder
      from product
      where product.id = ${id_product};`
    );
    if (rows.length === 0) return null;
    return rows[0];
  },

  addReview: (productID, userID, reviewerID, content, point, timeNow) =>
    db.load(`INSERT INTO review (id_user, review, reviewer, id_product, marks, time)
  VALUES (${userID}, "${content}", ${reviewerID}, ${productID}, ${point}, "${timeNow}");`),

  sendUpgradeRequest: userID => db.load(`update user set request = 1 where id = ${userID}`),

  del: id => db.load(`update user set status = 0 where id = ${id}`),
  cancelRequest: id => db.load(`update user set request = 0 where id = ${id}`),
  confirmRequest: id =>
    db.load(`update user set request = 0 , permission = 1 where id = ${id}`),
  update: (entity, id) => db.patch("user", entity, { id: id }),



  getThumbnailByID: async id_product => {
    const rows = await db.load(
      `select src
      from image
      where image.id_product = ${id_product};`
    );
    if (rows.length === 0) return null;
    return rows[0];
  },
};
