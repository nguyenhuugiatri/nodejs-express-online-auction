const express = require('express');
const productModel = require('../models/home.model');

const router = express.Router();


router.get('/', async (req, res) => {
  const proId = req.params.id;
  const rows = await productModel.getProductPriceDESC(proId);
  res.render('home', {
    listProductDESC: rows
  });
})

module.exports = router;