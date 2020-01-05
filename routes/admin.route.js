const express = require("express");
const router = express.Router();
const adminModel = require("../models/admin.model");
const userModel = require("../models/user.model");
const categoryModel = require("../models/category.model");
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
  try {
    const users = await userModel.all();
    return res.send(users);
  } catch (err) {
    return res.status(403).send({ message: "List failed" });
  }
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
  const id = parseInt(req.body.id);
  const N = 10;
  const hash = bcrypt.hashSync(req.body.password, N);
  const entity = req.body;
  entity.password = hash;
  delete entity.id;
  delete entity.username;
  delete entity.email;
  try {
    await userModel.update(entity, id);
    return res.status(200).send({ message: "Update success" });
  } catch (err) {
    console.log(err);
    return res.status(403).send({ message: "Update failed" });
  }
});

router.get("/category/list", requireToken, async (req, res, next) => {
  try {
    const category = await categoryModel.allWithNumberOfProducts();
    return res.send(category);
  } catch (err) {
    return res.status(403).send({ message: "List failed" });
  }
});

router.get("/category/delete", requireToken, async (req, res, next) => {
  const { id } = req.query;
  try {
    await categoryModel.del(id);
    return res.status(200).send({ message: "Delete success" });
  } catch (err) {
    return res.status(403).send({ message: "Delete failed" });
  }
});

router.post("/category/add", requireToken, async (req, res, next) => {
  checkExist = await categoryModel.singleByName(req.body.name);
  if (checkExist !== null) {
    return res.status(403).send({ message: "Category name exists" });
  }

  const entity = req.body;
  try {
    await categoryModel.add(entity);
    return res.status(200).send({ message: "Add success" });
  } catch (err) {
    return res.status(403).send({ message: "Add failed" });
  }
});

router.post("/category/update", requireToken, async (req, res, next) => {
  const id = parseInt(req.body.id);
  const entity = req.body;
  try {
    await categoryModel.update(entity, id);
    return res.status(200).send({ message: "Update success" });
  } catch (err) {
    console.log(err);
    return res.status(403).send({ message: "Update failed" });
  }
});

const nodemailer = require("nodemailer");
router.post("/send-mail", function(req, res) {
  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "vutuan3719@gmail.com",
      pass: "cnpm2019"
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const content = `
        <div style="padding: 10px; background-color: #003375">
            <div style="padding: 10px; background-color: white;">
                <h4 style="color: #0085ff">Online Auction</h4>
                <span style="color: black">This is email confirm you bid success</span>
            </div>
        </div>
    `;
  var mainOptions = {
    from: "Online Auction",
    to: req.body.email,
    subject: "Auto Confirm Email",
    text: "This is auto email",
    html: content
  };
  transporter.sendMail(mainOptions, function(err, info) {
    if (err) {
      console.log(err);
      return res.send("Lỗi gửi mail: " + err);
    } else {
      console.log("Message sent: " + info.response);
      req.send("Một email đã được gửi đến tài khoản của bạn");
    }
  });
});

module.exports = router;
