const express = require("express");
const homeModel = require("../models/home.model");
const helper = require("./../utils/helper");
var storeModel = require("../models/store.model");
var moment = require("moment");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  if (req.query.isAuto) {
    const { userid, idproduct, bidprice } = req.query;
    try {
      await homeModel.addToAutoBid(userid, idproduct, bidprice);
    } catch (err) {
      console.log(err);
    }
  } else {
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
      if (req.session && req.session.user && req.session.user.id)
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
  }
});
router.get("/permission", async (req, res) => {
  idUser = req.query.userid;
  console.log(idUser);
  await homeModel.upgradeUser(idUser);
  return res.send("Send Success");
});
router.get("/check", async (req, res) => {
  var idUser = req.query.userid;
  console.log(idUser);
  const user = await homeModel.getInforUser(idUser);
  return res.send({ permission: user[0].permission, request: user[0].request });
});

router.get("/deny", async (req, res) => {
  try {
    var idUser = req.query.userid;
    var idProduct = req.query.idproduct;
    await homeModel.deleteBiddingUser(idProduct, idUser);
    await homeModel.banBidder(idProduct, idUser);
    const maxBidPrice = await homeModel.getBidPriceMax(idProduct);
    const productCurrent = await homeModel.getProductCurrent(idProduct);
    if (maxBidPrice.length === 0)
      await homeModel.UpdateProduct(
        idProduct,
        null,
        productCurrent[0].startPrice
      );
    else
      await homeModel.UpdateProduct(
        idProduct,
        maxBidPrice[0].id_user,
        maxBidPrice[0].bidPrice
      );
    axios({
      method: "post",
      url: "http://localhost:3000/email/deny",
      data: {
        email: req.session.user.email,
        productName: productCurrent[0].name,
        denyTime: moment().format("YYYY-MM-DD HH:mm:ss")
      }
    });
    return res.send("Success");
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
