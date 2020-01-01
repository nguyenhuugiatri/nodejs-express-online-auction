const express = require('express');
const productModel = require('../models/home.model');

const router = express.Router();


router.get('/', async (req, res) => {
  const proId = req.params.id;
  const rowsPrice = await productModel.getProductPriceDESC(proId);
  const rowsEndate = await productModel.getProductEndateDESC(proId);
  const rowsBidd = await productModel.getProductBiddDESC(proId);
  res.render('home', {
    listProductPriceDESC: rowsPrice,
    listProductEndateDESC: rowsEndate,
    listProductBiddDESC: rowsBidd
  });
})

module.exports = router;