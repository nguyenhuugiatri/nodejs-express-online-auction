const express = require("express");
const homeModel = require("../models/home.model");
const helper = require("./../utils/helper");
var storeModel = require("../models/store.model");
const userModel = require("../models/user.model");
var moment = require("moment");
const router = express.Router();

router.get("/", async (req, res, next) => {
  const rowsPrice = await homeModel.getProductPriceDESC();
  const rowsEndate = await homeModel.getProductEndateDESC();
  const rowsBidd = await homeModel.getProductBiddDESC();
  var idUser = -1;
  if (req.session.user) {
    idUser = req.session.user.id;
  }
  const listNowTake = await userModel.getUserTakeNowProduct(idUser);
  // check dang giu gia
  for (let i = 0; i < rowsPrice.length; i++) {
    for (let j = 0; j < listNowTake.length; j++) {
      if (helper.checkCurrentPrice(rowsPrice[i].idproduct, listNowTake)) {
        rowsPrice[i].now = true;
      }
    }
  }
  for (let i = 0; i < rowsEndate.length; i++) {
    for (let j = 0; j < listNowTake.length; j++) {
      if (helper.checkCurrentPrice(rowsEndate[i].idproduct, listNowTake)) {
        rowsEndate[i].now = true;
      }
    }
  }
  for (let i = 0; i < rowsBidd.length; i++) {
    for (let j = 0; j < rowsBidd.length; j++) {
      if (helper.checkCurrentPrice(rowsBidd[i].idproduct, listNowTake)) {
        rowsBidd[i].now = true;
      }
    }
  }
  // lấy thumbnail source cho products
  for (let i = 0; i < rowsPrice.length; i++) {
    var productID = rowsPrice[i].idproduct; // lấy id product
    const thumbnailSrc = (await homeModel.getThumbnailByID(productID)).src;
    rowsPrice[i].thumbnailSrc = thumbnailSrc;
  }
  for (let i = 0; i < rowsEndate.length; i++) {
    var productID = rowsEndate[i].idproduct; // lấy id product
    const thumbnailSrc = (await homeModel.getThumbnailByID(productID)).src;
    rowsEndate[i].thumbnailSrc = thumbnailSrc;
  }
  for (let i = 0; i < rowsBidd.length; i++) {
    var productID = rowsBidd[i].idproduct; // lấy id product
    const thumbnailSrc = (await homeModel.getThumbnailByID(productID)).src;
    rowsBidd[i].thumbnailSrc = thumbnailSrc;
  }


  const category = await homeModel.getCategories();
  
  const wishList = await storeModel.getWishListbyId(idUser);
  const today = moment();
  for (let i = 0; i < rowsPrice.length; i++) {
    var timeStart = moment(rowsPrice[i].startDate);
    var s = moment().diff(timeStart, "seconds");
    console.log(timeStart + " " + today + "a");
    if (s <= 86400) {
      rowsPrice[i].new = true;
    }
    for (let j = 0; j < wishList.length; j++) {
      if (helper.check(rowsPrice[i].idproduct, wishList)) {
        rowsPrice[i].like = true;
      }
    }
    if (rowsPrice[i].fullname !== null) {
      rowsPrice[i].fullname = helper.maskNameString(rowsPrice[i].fullname);
    } else rowsPrice[i].fullname = "Chưa có người đấu giá";
    var endDate = moment(rowsPrice[i].endDate).format("YYYY-MM-DD HH:mm:ss");
    // var timeleft = moment(endDate.diff(today));
    // var stringTime = helper.convertTimeLeft(timeleft);
    rowsPrice[i].timeLeft = endDate;
  }
  for (let i = 0; i < rowsEndate.length; i++) {
    var timeStart = moment(rowsEndate[i].startDate);
    var s = today.diff(timeStart, "seconds");
    if (s <= 86400) {
      rowsEndate[i].new = true;
    }
    for (let j = 0; j < wishList.length; j++) {
      if (helper.check(rowsEndate[i].idproduct, wishList)) {
        rowsEndate[i].like = true;
      }
    }
    if (rowsEndate[i].fullname !== null) {
      rowsEndate[i].fullname = helper.maskNameString(rowsEndate[i].fullname);
    } else rowsEndate[i].fullname = "Chưa có người đấu giá";
    var endDate = moment(rowsEndate[i].endDate).format("YYYY-MM-DD HH:mm:ss");
    // var timeleft = moment(endDate.diff(today));
    // var stringTime = helper.convertTimeLeft(timeleft);
    rowsEndate[i].timeLeft = endDate;
  }

  for (let i = 0; i < rowsBidd.length; i++) {
    var timeStart = moment(rowsBidd[i].startDate);
    var s = today.diff(timeStart, "seconds");
    if (s <= 86400) {
      rowsBidd[i].new = true;
    }
    for (let j = 0; j < wishList.length; j++) {
      if (helper.check(rowsBidd[i].idproduct, wishList)) {
        rowsBidd[i].like = true;
      }
    }
    if (rowsBidd[i].fullname !== null) {
      rowsBidd[i].fullname = helper.maskNameString(rowsBidd[i].fullname);
    } else rowsBidd[i].fullname = "Chưa có người đấu giá";

    var endDate = moment(rowsBidd[i].endDate).format("YYYY-MM-DD HH:mm:ss");
    // var timeleft = moment(endDate.diff(today));
    // var stringTime = helper.convertTimeLeft(timeleft);
    rowsBidd[i].timeLeft = endDate;
  }

  res.render("home", {
    listProductPriceDESC: rowsPrice,
    listProductEndateDESC: rowsEndate,
    listProductBiddDESC: rowsBidd,
    allCategories: category
  });
});
// router.get("/bidding", async (req, res) => {
//   var jsonGet = {};
//   jsonGet = req.query;
//   var idUser, idProduct,bidPrice;
//   for (const key in jsonGet) {
//     if (key === "userid") idUser = jsonGet[key];
//     if (key === "idproduct") idProduct = jsonGet[key];
//     if (key === "bidprice") bidPrice = jsonGet[key];
//   }
//   var now = moment().format("YYYY-MM-DD hh:mm:ss");
//   console.log(idUser +" " + idProduct + " " + bidPrice);
//   const productCurrent = await homeModel.getProductCurrent(idProduct);
//   if (parseInt(bidPrice) > parseInt(productCurrent[0].currentPrice)) {
//     await homeModel.upProductBidding(idProduct , idUser , bidPrice);
//     await homeModel.upBiddingList(idProduct,now,bidPrice,idUser)
//     return res.send("Bid Success");
//   } else {
//     return res.send("Bid Fail");
//   }
// });
module.exports = router;
