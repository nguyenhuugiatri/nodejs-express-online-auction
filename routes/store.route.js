const express = require("express");
var storeModel = require("../models/store.model");
const config = require("../config/default.json");

const router = express.Router();

router.get("/", async (req, res) => {
  const rows = await storeModel.all();

  res.render("store", {
    products: rows, ///////////////////////////////////////////////////////////
    empty: rows.length === 0
  });
});
module.exports = router;
