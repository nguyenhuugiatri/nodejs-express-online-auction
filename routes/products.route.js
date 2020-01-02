const express = require("express");
const productModel = require("../models/products.model");
const categoryModel = require("../models/category.model");
const multer=require('multer');

router.get("/detail/:id", async (req, res) => {
  const proId = req.params.id;
  const rows = await productModel.getProductByID(proId);
  const nameSeller = await productModel.getSellerProductByID(proId);
  res.render("vwProducts/product", {
    product: rows[0],
    sellerName: nameSeller[0]
  });
});

router.get("/add/", async (req, res) => {
  const catList = await categoryModel.all();
  res.render("vwProducts/addProduct", {
    catList
  });
});

module.exports = router;
