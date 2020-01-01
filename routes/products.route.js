const express = require('express');
const productModel = require('../models/products.model');

const router = express.Router();


router.get('/:id', async (req, res) => {
  const proId = req.params.id;
  const rows = await productModel.getProductByID(proId);
  res.render('vwProducts/product', {
    product: rows[0]
  });
})

module.exports = router;