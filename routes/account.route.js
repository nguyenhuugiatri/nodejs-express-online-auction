const express = require("express");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const userModel = require("../models/user.model");
var storeModel = require("../models/store.model");
const homeModel = require("../models/home.model");
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
      message: "notfound"
    });

  const rs = bcrypt.compareSync(req.body.password, user.password);
  if (!rs)
    return res.render("vwAccount/signin", {
      layout: false,
      message: "fail"
    });

  delete user.password;
  // req.session.isAuthenticated = true;
  req.session.user = user;

  const url = req.query.retUrl || "/";
  res.redirect(url);
});

router.get("/logout", function(req, res, next) {
  if (req.session) {
    req.session.destroy(function(err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect("/");
      }
    });
  }
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

router.get("/profile", requireLogin, async (req, res) => {
  return res.redirect(`/account/profile/${req.session.user.id}`);
});

router.get("/profile/:id", async (req, res) => {
  const userId = req.params.id;
  const row_user = await userModel.single(userId);
  const rows = await userModel.getWishListbyID(userId);
  const category = await homeModel.getCategories();
  console.log(rows);
  res.render("vwAccount/profile", {
    profile: row_user,
    products: rows,
    empty: rows.length === 0,
    allCategories: category,
    idUSer: userId
  });
});

router.get("/profile/:id/edit", requireLogin, async (req, res) => {
  const userId = req.params.id;
  if (req.session.user.id != userId) {
    return res.render("notFound", {
      message: "non permission"
    });
  }
  const row_user = await userModel.single(userId);
  res.render("vwAccount/edit", {
    editProfile: row_user
  });
});

router.post("/profile/:id/edit", async (req, res) => {
  const userId = req.params.id;

  const entity = req.body;
  console.log(entity);
  const result = await userModel.update(entity, userId);
  const url = "/account/profile/" + userId;
  res.redirect(url);
});
router.get("/addWishList",async (req,res)=>{
  var jsonGet = {};
  jsonGet = req.query;
  var idUser,idProduct;
  for (const key in jsonGet) {
    if (key==="userid")
      idUser = jsonGet[key];
    if (key==="idproduct")
      idProduct = jsonGet[key];
  }
  const checkExist = await userModel.checkWishList(idUser, idProduct);
  if (checkExist.length===0)
  {
     await userModel.addWishList(idUser, idProduct);
    return res.send("Add Success");
  }
  else
  {
    await userModel.deleteWishList(idUser, idProduct);
    return res.send("Delete Success");
  }
});

router.get("/profile/:id/search", async (req, res) => {
  const userId = req.params.id;
  console.log(req.query);
  const row_user = await userModel.single(userId);
  const rows = await userModel.getWishListbyID_Name(userId,req.query.nameproduct);
  const category = await homeModel.getCategories();
  res.render("vwAccount/profile", {
    profile: row_user,
    products: rows,
    empty: rows.length === 0,
    allCategories: category,
    idUSer: userId
  });
});

router.get("/list", async (req, res) => {
  return res.send([
    {
      id: 1,
      username: "thaianh",
      password: "thaianhvip",
      fullname: "0944026115",
      gender: "1",
      email: "thainh@gmail.com",
      phone: "01232131",
      dob: "2020-01-08 22:01:03",
      permission: "1",
      active:"0"
    },
    {
      id: 1,
      username: "thaianh",
      password: "thaianhvip",
      fullname: "0944026115",
      gender: "1",
      email: "thainh@gmail.com",
      phone: "01232131",
      dob: "2020-01-08 22:01:03",
      permission: "1",
      active:"1"
    },
    {
      id: 1,
      username: "thaianh",
      password: "thaianhvip",
      fullname: "0944026115",
      gender: "1",
      email: "thainh@gmail.com",
      phone: "01232131",
      dob: "2020-01-08 22:01:03",
      permission: "1",
      active:"0"
    }
  ]);
});

module.exports = router;
