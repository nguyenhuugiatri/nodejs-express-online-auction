const express = require("express");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const userModel = require("../models/user.model");
const Swal = require("sweetalert2");
const restrict = require("../middlewares/auth.mdw");

const router = express.Router();

router.get("/signin", (req, res) => {

  res.render("vwAccount/signin", {
    layout: false
  });
});

router.post("/signin", async (req, res) => {
  const user = await userModel.singleByUsername(req.body.username);
  if (user === null)
    return res.render("vwAccount/signin", {
      layout: false,
      err_message: `{"icon": "info",
  "title": "Error",
  "text": "Invalid username or password"}`
    });

const rs = bcrypt.compareSync(req.body.password, user.password);
if(!rs)
    return res.render("vwAccount/signin", {
      layout: false,
      err_message: `{"icon": "error",
  "title": "Error",
  "text": "Login failed"}`
    });

  delete user.password;
  req.session.isAuthenticated = true;
  req.session.authUser = user;

  const url = req.query.retUrl || "/";
  res.redirect(url);
});




router.get('/signup', async (req, res) => {
  res.render('vwAccount/signup');
});


router.post("/signup", async (req, res) => {
    const N = 10;
    const hash = bcrypt.hashSync(req.body.password, N);

  const entity = req.body;
  entity.password = hash;
  entity.fullname = entity.firstName + " " + entity.lastName;
  delete entity.repassword;
  delete entity.lastName;
  delete entity.firstName;
  

  const result = await userModel.add(entity);
  const url = "/account/signin";
  res.redirect(url);
});

module.exports = router;
