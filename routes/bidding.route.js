const express = require("express");
const homeModel = require("../models/home.model");
const helper = require("./../utils/helper");
var storeModel = require("../models/store.model");
var moment = require("moment");
const router = express.Router();
router.get("/", async (req, res) => {
    var jsonGet = {};
    jsonGet = req.query;
    var idUser, idProduct,bidPrice;
    for (const key in jsonGet) {
      if (key === "userid") idUser = jsonGet[key];
      if (key === "idproduct") idProduct = jsonGet[key];
      if (key === "bidprice") bidPrice = jsonGet[key];
    }
    var now = moment().format("YYYY-MM-DD hh:mm:ss");
    console.log(idUser +" " + idProduct + " " + bidPrice);
    const productCurrent = await homeModel.getProductCurrent(idProduct);
    if (parseInt(bidPrice) > parseInt(productCurrent[0].currentPrice)) {
      await homeModel.upProductBidding(idProduct , idUser , bidPrice);
      await homeModel.upBiddingList(idProduct,now,bidPrice,idUser)
      return res.send("Bid Success");
    } else {
      return res.send("Bid Fail");
    }
  });
  module.exports = router;