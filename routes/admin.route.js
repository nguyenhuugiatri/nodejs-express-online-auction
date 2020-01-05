const express = require("express");
const router = express.Router();
const adminModel = require("../models/admin.model");
const userModel = require("../models/user.model");
const requireToken = require("./../middlewares/adminAuth.mdw");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const moment = require("moment");
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
    expiresIn: "1h",
    algorithm: "HS256"
  });

  delete user.password;
  delete user.username;
  return res.send({ user, token });
});

router.get("/user/list", requireToken, async (req, res, next) => {
  const users = await userModel.all();
  res.send(users);
});

router.get("/user/delete", requireToken, async (req, res, next) => {
  const { id } = req.query;
  try {
    await userModel.del(id);
    return res.status(200).send({ message: "Delete success" });
  } catch (err) {
    return res.status(403).send({ message: "Delete failed" });
  }
});

router.get("/user/confirm-request", requireToken, async (req, res, next) => {
  const { id } = req.query;
  try {
    await userModel.confirmRequest(id);
    return res.status(200).send({ message: "Confirm success" });
  } catch (err) {
    return res.status(403).send({ message: "Confirm failed" });
  }
});

router.get("/user/cancel-request", requireToken, async (req, res, next) => {
  const { id } = req.query;
  try {
    await userModel.cancelRequest(id);
    return res.status(200).send({ message: "Cancel success" });
  } catch (err) {
    return res.status(403).send({ message: "Cancel failed" });
  }
});

router.post("/user/add", requireToken, async (req, res, next) => {
  checkExist = await userModel.singleByEmailUsername(
    req.body.username,
    req.body.email
  );
  if (checkExist !== null) {
    return res.status(403).send({ message: "Account exists" });
  }

  const N = 10;
  const hash = bcrypt.hashSync(req.body.password, N);
  const entity = req.body;
  entity.password = hash;
  entity.gender = parseInt(entity.gender);
  entity.joindate = moment().format(moment.HTML5_FMT.DATE);

  const result = await userModel.add(entity);
  return res.status(200).send({ message: "Add success" });
});

router.post("/user/update", requireToken, async (req, res, next) => {
  const id=parseInt(req.body.id);
  const N = 10;
  const hash = bcrypt.hashSync(req.body.password, N);
  const entity = req.body;
  entity.password = hash;
  delete entity.id;
  delete entity.username;
  delete entity.email;
  try {
    await userModel.update(entity,id);
    return res.status(200).send({ message: "Update success" });
  } catch (err) {
    console.log(err);
    return res.status(403).send({ message: "Update failed" });
  }
});

module.exports = router;
