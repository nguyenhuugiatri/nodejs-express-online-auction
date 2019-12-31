const express = require("express");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const userModel = require("../models/user.model");
// const restrict = require("../middlewares/auth.mdw");

const router = express.Router();

router.get("/signin", (req, res) => {
  res.render("vwAccount/signin");
});

router.post("/signin", async (req, res) => {
  const user = await userModel.singleByUsername(req.body.username);
  if (user === null) throw new Error("Invalid username or password.");
  // const rs = bcrypt.compareSync(req.body.password, user.f_Password);
  // if (rs === false)
  //   return res.render('vwAccount/login', {
  //     layout: false,
  //     err_message: 'Login failed'
  //   });
  if (user.password !== req.body.password) {
    console.log("Login fail");
  }
  // delete user.f_Password;
  // req.session.isAuthenticated = true;
  // req.session.authUser = user;
  const url = req.query.retUrl || "/";
  res.redirect(url);
});

module.exports = router;
