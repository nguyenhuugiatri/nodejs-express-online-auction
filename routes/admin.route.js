const express = require("express");
const homeModel = require("../models/home.model");
const router = express.Router();
const userModel = require("../models/user.model");
const DASHBOARD_URL='http://localhost:8080/';

router.get("/", async (req, res, next) => {
  res.redirect(DASHBOARD_URL);
});

router.get("/user/list", async (req, res, next) => {
  const users=await userModel.all();
  res.send(users);
});

module.exports = router;
