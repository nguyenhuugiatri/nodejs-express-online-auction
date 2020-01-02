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



module.exports = router;
