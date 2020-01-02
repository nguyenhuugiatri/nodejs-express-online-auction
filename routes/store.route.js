const express = require("express");
var storeModel = require("../models/store.model");
const config = require("../config/default.json");
var moment = require('moment');
const db = require("./../utils/db");

const router = express.Router();


function getJsonFromUrl(url) {
  var json = {};
  json = JSON.parse('{"' + decodeURI(url.replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}')
  return json;
}

router.get("/", async (req, res) => {
  const rows = await storeModel.all();
  var today = moment();
  console.log(s+ "AAAAAAAAAA");
  for (let i=0;i<rows.length;i++)
  {
    var timeStart = moment(rows[i].startDate);
    var s = today.diff(timeStart, 'seconds')
    if (s<=600)
    {
      rows[i].new = true;
    }
  }
  rows.reverse(); 
  res.render("store", {
    products: rows,///////////////////////////////////////////////////////////
    empty: rows.length === 0
  });
});

router.get("/search", async(req,res)=>{
  const searchInput = req.query.searchInput;
  
  const rowsCategory = await storeModel.categoryOfSearchName(searchInput);

  console.log(req.query);
  var jsonGet ={};
  jsonGet = req.query;
  var sql ="select * from product where"
  var flag=0;
  for (const key in jsonGet)
  {

    if (key==="searchInput")
    {
      if (Object.keys(jsonGet).length===1)
      {
        sql += ` name like '%${jsonGet[key]}%'`;
      }
      else{
        sql += ` and name like '%${jsonGet[key]}%'`;
      }
    }
    else {
      if (flag===0)
      {
        sql += ` category = ${key}`;
        flag=1;
      }
      else
      {
        sql += ` or category = ${key}`;
      }
    }
  
  }
  
  const rows = await storeModel.searchbyNameCategory(sql);
  console.log(sql);
  res.render("store",{
    products: rows,
    categories: rowsCategory,
    empty:rows.length===0,
    input:searchInput
  });
});

module.exports = router;
