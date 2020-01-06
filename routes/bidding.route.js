const express = require("express");
const homeModel = require("../models/home.model");
const helper = require("./../utils/helper");
var storeModel = require("../models/store.model");
var productModel = require("../models/products.model");
var userModel = require("../models/user.model");
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
  const checkIsBan = await homeModel.CheckBanUser(idUser, idProduct);

  const number_of_reviews = (await userModel.getNumberOfReviews(idUser))
    .number_of_reviews;
  const positive_reviews = (await userModel.getNumberOfPositiveReviews(idUser))
    .positive_reviews;

  const requireReputation = (await productModel.isRequireReputation(idProduct))
    .requireReputation;

  var ratingPoint = 0;
  // console.log("number_of_reviews" + number_of_reviews);////////
  // console.log("positive_reviews" + positive_reviews);////////
  if (number_of_reviews === 0) {
    ratingPoint = 0;
  } else ratingPoint = (positive_reviews / number_of_reviews) * 100;
  // check uy tin
  if (ratingPoint < 80 && requireReputation == 1) {
    return res.send("Enough");
  }
  // check banned
  if (checkIsBan.length > 0) {
    return res.send("Banned");
  }
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
