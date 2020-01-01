const express = require("express");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const userModel = require("../models/user.model");
// const restrict = require("../middlewares/auth.mdw");

const router = express.Router();

router.get("/signin", (req, res) => {
  res.render("vwAccount/signin", { layout: false });
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

router.get("/signup", async (req, res) => {
  res.render("vwAccount/signup", { layout: false });
});

router.post("/signup", async (req, res) => {
  const entity = req.body;
  entity.fullname = entity.firstName + " " + entity.lastName;
  delete entity.repassword;
  delete entity.lastName;
  delete entity.firstName;

  const result = await userModel.add(entity);
  const url = req.query.retUrl || "/account/signin";
  res.redirect(url);
});

module.exports = router;
