const express = require("express");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const userModel = require("../models/user.model");
const Swal = require("sweetalert2");
const restrict = require("../middlewares/auth.mdw");
const requireLogin = require("./../middlewares/auth.mdw");
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
      message: 'notfound'
    });

  const rs = bcrypt.compareSync(req.body.password, user.password);
  if (!rs)
    return res.render("vwAccount/signin", {
      layout: false,
      message: 'fail'
    });

  delete user.password;
  // req.session.isAuthenticated = true;
  req.session.user = user;

  const url = req.query.retUrl || "/";
  res.redirect(url);
});

router.get("/signup", async (req, res) => {
  res.render("vwAccount/signup", { layout: false });
});

router.post("/signup", async (req, res) => {
  const N = 10;
  const hash = bcrypt.hashSync(req.body.password, N);

  const entity = req.body;
  entity.password = hash;
  entity.fullname = entity.firstName + " " + entity.lastName;
  entity.gender = parseInt(entity.gender);

  delete entity.repassword;
  delete entity.lastName;
  delete entity.firstName;
  const result = await userModel.add(entity);

  return res.render("vwAccount/signup", {
    layout: false,
    message: "success"
  });
});

router.get("/profile/:id", async (req, res) => {
  const userId = req.params.id;
  const row_user = await userModel.single(userId);
  res.render("vwAccount/profile", {
    profile: row_user
  });
});

router.get("/profile/:id/edit", requireLogin,async (req, res) => {
  const userId = req.params.id;
  console.log(userId,req.session.user.id)
  if(req.session.user.id!=userId){
    return res.render('blank',{
      message:'non permission'
    })
  }
  const row_user = await userModel.single(userId);
  res.render("vwAccount/edit", {
    editProfile: row_user
  });
});

module.exports = router;
