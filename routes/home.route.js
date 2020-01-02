const express = require("express");
const homeModel = require("../models/home.model");
const router = express.Router();

router.get("/", async (req, res, next) => {
  const rowsPrice = await homeModel.getProductPriceDESC();
  const rowsEndate = await homeModel.getProductEndateDESC();
  const rowsBidd = await homeModel.getProductBiddDESC();
  const rowsBuy = await homeModel.getProductPriceBuyDESC();
  const category = await homeModel.getCategories();
  res.render("home", {
    listProductPriceDESC: rowsPrice,
    listProductEndateDESC: rowsEndate,
    listProductBiddDESC: rowsBidd,
    listProductBuyNowDESC: rowsBuy,
    allCategories: category
  });
});

module.exports = router;
