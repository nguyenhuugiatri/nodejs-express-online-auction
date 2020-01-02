const express = require('express');
const productModel = require('../models/products.model');
const homeModel = require('../models/home.model');
const router = express.Router();


router.get('/:id', async (req, res) => {
  const proId = req.params.id;
  const rows = await productModel.getProductByID(proId);
  const nameSeller = await productModel.getSellerProductByID(proId);
  const category = await homeModel.getCategories();
  res.render('vwProducts/product', {
    product: rows[0],
    sellerName : nameSeller[0],
    allCategories : category
  });
})

module.exports = router;