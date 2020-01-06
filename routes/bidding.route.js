const express = require("express");
const homeModel = require("../models/home.model");
const helper = require("./../utils/helper");
var storeModel = require("../models/store.model");
var moment = require("moment");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  var jsonGet = {};
  jsonGet = req.query;
  var idUser, idProduct, bidPrice;
  for (const key in jsonGet) {
    if (key === "userid") idUser = jsonGet[key];
    if (key === "idproduct") idProduct = jsonGet[key];
    if (key === "bidprice") bidPrice = jsonGet[key];
  }
  var now = moment().format("YYYY-MM-DD hh:mm:ss");
  const productCurrent = await homeModel.getProductCurrent(idProduct);
  if (parseInt(bidPrice) > parseInt(productCurrent[0].currentPrice)) {
    await homeModel.upProductBidding(idProduct, idUser, bidPrice);
    await homeModel.upBiddingList(idProduct, now, bidPrice, idUser);
    //Send email
    axios({
      method: "post",
      url: "http://localhost:3000/email/bidding-confirm",
      data: {
        email: req.session.user.email,
        bidPrice,
        productName: productCurrent[0].name,
        bidTime: now
      }
    });
    return res.send("Bid Success");
  } else {
    return res.send("Bid Fail");
  }
});
router.get("/permission", async (req, res) => {
  idUser = req.query.userid;
  console.log(idUser);
  await homeModel.upgradeUser(idUser);
  return res.send("Send Success");
});
router.get("/check", async (req, res) => {
  idUser = req.query.userid;
  console.log(idUser);
  const user = await homeModel.getInforUser(idUser);
  return res.send({permission : user[0].permission, request :user[0].request});
});
module.exports = router;
