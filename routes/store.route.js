const express = require("express");
var storeModel = require("../models/store.model");
const config = require("../config/default.json");
var moment = require("moment");
const db = require("./../utils/db");
const helper = require("./../utils/helper");
const homeModel = require("../models/home.model");

const router = express.Router();

router.get("/", async (req, res) => {
  const rows = await storeModel.all();
  const category = await homeModel.getCategories();
  
  var idUser = -1;
   if (req.session.user)
   {
     idUser = req.session.user.id;
   }
  const wishList = await storeModel.getWishListbyId(idUser);
  // console.log(helper(2,wishList));
  const today = moment();
  for (let i = 0; i < rows.length; i++) {
    var timeStart = moment(rows[i].startDate);
    var s = today.diff(timeStart, "seconds");
    if (s <= 600) {
      rows[i].new = true;
    }
    for (let j = 0; j < wishList.length; j++) {
      if (helper.check(rows[i].id, wishList)) 
           { 
             rows[i].like = true;
           }
    }
    
  }

  rows.reverse();
  console.log(idUser + "AAAAAAAA");
  res.render("store", {
    products: rows,
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
  var sql = "select * from product where";
  var flagCate = 0;
  var flagCheck = 0;
  for (const key in jsonGet) {
    if (key !== "searchInput" && key !== "priceASC" && key != "endDate")
      flagCheck = 1;
  }
  console.log(flagCheck);
  for (const key in jsonGet) {
    if (key === "searchInput") {
      if (flagCheck === 0) {
        sql += ` name like '%${jsonGet[key]}%'`;
      } else {
        sql += `) and name like '%${jsonGet[key]}%'`;
      }
    } else if (key === "endDate" && jsonGet[key] === "true") {
      sql += " ORDER BY endDate DESC";
    } else if (key === "priceASC" && jsonGet[key] === "true") {
      sql += " ORDER BY currentPrice ASC";
    } else if (key === "priceASC" && jsonGet[key] === "false") {
      sql += " ORDER BY currentPrice DESC";
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
  if (req.session.user)
  {
    idUser = req.session.user.id;
  }
 const wishList = await storeModel.getWishListbyId(idUser);
 // console.log(helper(2,wishList));
 for (let i = 0; i < rows.length; i++) {
   var timeStart = moment(rows[i].startDate);
   var s = today.diff(timeStart, "seconds");
   if (s <= 600) {
     rows[i].new = true;
   }
   for (let j = 0; j < wishList.length; j++) {
     if (helper.check(rows[i].id, wishList)) 
          { 
            rows[i].like = true;
          }
   }
   
 }
  res.render("store", {
    products: rows,
    categories: rowsCategory,
    empty: rows.length === 0,
    input: searchInput,
    allCategories: category
  });
});

module.exports = router;
