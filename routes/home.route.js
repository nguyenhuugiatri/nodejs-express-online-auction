const express = require("express");
const homeModel = require("../models/home.model");
const helper = require("./../utils/helper");
var storeModel = require("../models/store.model");
var moment = require("moment");
const router = express.Router();

router.get("/", async (req, res, next) => {
  const rowsPrice = await homeModel.getProductPriceDESC();
  const rowsEndate = await homeModel.getProductEndateDESC();
  const rowsBidd = await homeModel.getProductBiddDESC();
  const category = await homeModel.getCategories();
  var idUser = -1;
  if (req.session.user) {
    idUser = req.session.user.id;
  }
  const wishList = await storeModel.getWishListbyId(idUser);
  const today = moment();
  for (let i = 0; i < rowsPrice.length; i++) {
    var timeStart = moment(rowsPrice[i].startDate);
    var s = today.diff(timeStart, "seconds");
    if (s <= 600) {
      rowsPrice[i].new = true;
    }
    for (let j = 0; j < wishList.length; j++) {
      if (helper.check(rowsPrice[i].id, wishList)) {
        rowsPrice[i].like = true;
      }
    }
    rowsPrice[i].fullname = helper.maskNameString(rowsPrice[i].fullname);
    var endDate = moment(rowsPrice[i].endDate);
    var timeleft = moment(endDate.diff(today));
    var stringTime = helper.convertTimeLeft(timeleft);
    rowsPrice[i].timeLeft = stringTime;
  }
  for (let i = 0; i < rowsEndate.length; i++) {
    var timeStart = moment(rowsEndate[i].startDate);
    var s = today.diff(timeStart, "seconds");
    if (s <= 600) {
      rowsEndate[i].new = true;
    }
    for (let j = 0; j < wishList.length; j++) {
      if (helper.check(rowsEndate[i].id, wishList)) {
        rowsEndate[i].like = true;
      }
    }
    rowsEndate[i].fullname = helper.maskNameString(rowsEndate[i].fullname);
    var endDate = moment(rowsEndate[i].endDate);
    var timeleft = moment(endDate.diff(today));
    var stringTime = helper.convertTimeLeft(timeleft);
    rowsEndate[i].timeLeft = stringTime;
  }

  for (let i = 0; i < rowsBidd.length; i++) {
    var timeStart = moment(rowsBidd[i].startDate);
    var s = today.diff(timeStart, "seconds");
    if (s <= 600) {
      rowsBidd[i].new = true;
    }
    for (let j = 0; j < wishList.length; j++) {
      if (helper.check(rowsBidd[i].id, wishList)) {
        rowsBidd[i].like = true;
      }
    }
    rowsBidd[i].fullname = helper.maskNameString(rowsBidd[i].fullname);
    var endDate = moment(rowsBidd[i].endDate);
    var timeleft = moment(endDate.diff(today));
    var stringTime = helper.convertTimeLeft(timeleft);
    rowsBidd[i].timeLeft = stringTime;
  }

  res.render("home", {
    listProductPriceDESC: rowsPrice,
    listProductEndateDESC: rowsEndate,
    listProductBiddDESC: rowsBidd,
    allCategories: category
  });
});

module.exports = router;
