const express = require("express");
const router = express.Router();
const adminModel = require("../models/admin.model");
const userModel = require("../models/user.model");
const requireToken = require("./../middlewares/adminAuth.mdw");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const DASHBOARD_URL = "http://localhost:8080/";

router.get("/", async (req, res, next) => {
  res.redirect(DASHBOARD_URL);
});

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  const user = await adminModel.singleByUsername(username);
  if (user === null)
    return res.status(404).send({
      message: "Not found"
    });

  const rs = bcrypt.compareSync(password, user.password);
  if (!rs)
    return res.status(403).send({
      message: "Wrong password"
    });

  const token = jwt.sign({ user: username }, "anhem1nha", {
    expiresIn: "10m",
    algorithm: "HS256"
  });

  delete user.password;
  delete user.username;
  return res.send({ user, token });
});

router.get("/user/list",requireToken, async (req, res, next) => {
  const users = await userModel.all();
  res.send(users);
});

module.exports = router;
