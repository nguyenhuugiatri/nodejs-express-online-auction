const db = require("../utils/db");

module.exports = {


    // getAllProduct(limit, offset) {return db.load("SELECT p.id as ID, p.name as name, u.name as hold, p.current_price as price, p.details as details, p.buy_now_price as buynow, p.startDate as dateStart, p.endDate as dateEnd, c.NAME as type  FROM category c, product p, user u  WHERE p.category = c.id AND u.id = p.id_bidder AND p.auctioned = 0  LIMIT " + limit + " OFFSET " + offset)},
    // getNumProduct() {return db.load('SELECT COUNT(*) as num FROM product WHERE auctioned = 0')},

    //single: id => db.load(`select * from products where ProID = ${id}`)
    all: () => db.load('select * from product'),
    searchbyName: name => db.load(`SELECT * FROM product where name like '%${name}%'`),
    categoryOfSearchName: name => db.load(`select c.id,count(p.id) as count , c.name from product as p, category as c  where  c.id = category and p.name LIKE '%${name}%' group by category`),
    searchbyNameCategory: sql => db.load(`${sql}`) ,
    getWishListbyId: idUser => db.load(`SELECT * FROM watchlist where id_user = ${idUser} `)
};
