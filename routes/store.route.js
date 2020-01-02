const express = require("express");
var storeModel = require("../models/store.model");
const config = require("../config/default.json");
var moment = require("moment");
const db = require("./../utils/db");
const homeModel = require("../models/home.model");

const router = express.Router();

router.get("/", async (req, res) => {
  const rows = await storeModel.all();
  var today = moment();
  const category = await homeModel.getCategories();
  for (let i = 0; i < rows.length; i++) {
    var timeStart = moment(rows[i].startDate);
    var s = today.diff(timeStart, "seconds");
    if (s <= 600) {
      rows[i].new = true;
    }
  }
  rows.reverse();
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
    if (key !== "searchInput" && key !== "priceASC" && key!= "endDate") flagCheck = 1;
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

  res.render("store", {
    products: rows,
    categories: rowsCategory,
    empty: rows.length === 0,
    input: searchInput,
    allCategories: category
  });
});

module.exports = router;
