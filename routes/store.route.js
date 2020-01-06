const express = require("express");
var storeModel = require("../models/store.model");
const config = require("../config/default.json");
var moment = require("moment");
const db = require("./../utils/db");
const helper = require("./../utils/helper");
const homeModel = require("../models/home.model");
const userModel = require("../models/user.model");

const router = express.Router();

router.get("/", async (req, res) => {
  const rows = await storeModel.all();
  const category = await homeModel.getCategories();
  const rowsCategory = await storeModel.categoryOfSearchName("");
  var idUser = -1;
  if (req.session.user) {
    idUser = req.session.user.id;
  }
  const wishList = await storeModel.getWishListbyId(idUser);
  // console.log(helper(2,wishList));
  const today = moment();
  for (let i = 0; i < rows.length; i++) {
    var timeStart = moment(rows[i].startDate);
    var s = today.diff(timeStart, "seconds");
    if (s <= 86400) {
      rows[i].new = true;
    }
    for (let j = 0; j < wishList.length; j++) {
      if (helper.check(rows[i].id, wishList)) {
        rows[i].like = true;
      }
    }
    if (rows[i].fullname !== null) {
      rows[i].fullname = helper.maskNameString(rows[i].fullname);
    } else rows[i].fullname = "Chưa có người đấu giá";
    var endDate = moment(rows[i].endDate).format("YYYY-MM-DD HH:mm:ss");
    // var timeleft = moment(endDate.diff(today));
    // var stringTime = helper.convertTimeLeft(timeleft);
    rows[i].timeLeft = endDate;
  }

  rows.reverse();
  console.log(idUser + "AAAAAAAA");
  res.render("store", {
    products: rows,
    categories: rowsCategory,
    empty: rows.length === 0,
    allCategories: category
  });
});

router.get("/search", async (req, res) => {
  const searchInput = req.query.searchInput;

  const rowsCategory = await storeModel.categoryOfSearchName(searchInput);

  console.log(req.query);
  var jsonGet = {};
  jsonGet = req.query;
  var sql =
    "SELECT p.id as idproduct,p.name,p.currentPrice ,p.startDate, p.endDate, u.fullname ,count(b.id_product) as count from product as p LEFT JOIN user as u ON p.id_bidder = u.id LEFT JOIN biddinglist as b ON p.id = b.id_product where ";
  var flagCate = 0;
  var flagCheck = 0;
  var flagCheckSort = 0;
  for (const key in jsonGet) {
    if (key !== "searchInput" && key !== "priceASC" && key !== "endDate" && key!== "page")
      flagCheck = 1;
    if (key === "priceASC" || key === "endDate") flagCheckSort = 1;
  }
  console.log(flagCheck);
  for (const key in jsonGet) {
    if (key === "page") {
      continue;
    }
    if (key === "searchInput") {
      if (flagCheckSort === 1) {
        if (flagCheck === 0) {
          sql += ` name like '%${jsonGet[key]}%' `;
        } else {
          sql += `) and name like '%${jsonGet[key]}%'`;
        }
      }
      else {
        if (flagCheck === 0) {
          sql += ` name like '%${jsonGet[key]}%' GROUP BY p.id`;
        } else {
          sql += `) and name like '%${jsonGet[key]}%' GROUP BY p.id`;
        }
      }
    } else if (key === "endDate" && jsonGet[key] === "true") {
      sql += " GROUP BY p.id ORDER BY endDate ASC";
    } else if (key === "priceASC" && jsonGet[key] === "true") {
      sql += " GROUP BY p.id ORDER BY currentPrice ASC";
    } else if (key === "priceASC" && jsonGet[key] === "false") {
      sql += " GROUP BY p.id ORDER BY currentPrice DESC";
    } else {
      if (flagCate === 0) {
        sql += `(category = ${key}`;
        flagCate = 1;
      } else {
        sql += ` or category = ${key}`;
      }
    }
  }
  console.log(sql);
  const category = await homeModel.getCategories();
  const rows = await storeModel.searchbyNameCategory(sql);
  const today = moment();
  var idUser = -1;
  if (req.session.user) {
    idUser = req.session.user.id;
  }
  const listNowTake = await userModel.getUserTakeNowProduct(idUser);
  // check dang giu gia
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < listNowTake.length; j++) {
      if (helper.checkCurrentPrice(rows[i].idproduct, listNowTake)) {
        rows[i].now = true;
      }
    }
  }
  const wishList = await storeModel.getWishListbyId(idUser);
  for (let i = 0; i < rows.length; i++) {
    var productID = rows[i].idproduct; // lấy id product
    const thumbnailSrc = (await homeModel.getThumbnailByID(productID)).src;
    rows[i].thumbnailSrc = thumbnailSrc;
  }
  // console.log(helper(2,wishList));
  for (let i = 0; i < rows.length; i++) {
    var timeStart = moment(rows[i].startDate);
    var s = today.diff(timeStart, "seconds");
    if (s <= 86400) {
      rows[i].new = true;
    }
    for (let j = 0; j < wishList.length; j++) {
      if (helper.check(rows[i].id, wishList)) {
        rows[i].like = true;
      }
    }
    if (rows[i].fullname !== null) {
      rows[i].fullname = helper.maskNameString(rows[i].fullname);
    } else rows[i].fullname = "Chưa có người đấu giá";
    var endDate = moment(rows[i].endDate).format("YYYY-MM-DD HH:mm:ss");
    // var timeleft = moment(endDate.diff(today));
    // var stringTime = helper.convertTimeLeft(timeleft);
    rows[i].timeLeft = endDate;
  }

  const page = parseInt(req.query.page) || 1;
  const perPage = 6;
  const start = (page - 1) * perPage;
  const end = page * perPage;
  const numbers=Math.ceil(rows.length/perPage);

  res.render("store", {
    products: rows.slice(start, end),
    categories: rowsCategory,
    empty: rows.length === 0,
    input: searchInput,
    allCategories: category,
    page,
    numbers
  });
});

module.exports = router;
