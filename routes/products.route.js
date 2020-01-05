const express = require("express");
const productModel = require("../models/products.model");
const categoryModel = require("../models/category.model");
const imageModel = require("../models/image.model");
const multer = require("multer");
const moment = require("moment");
const fs = require("fs");
const router = express.Router();
const homeModel = require("../models/home.model");
var storeModel = require("../models/store.model");
const requireLogin = require("./../middlewares/auth.mdw");
const helper = require("./../utils/helper");
const path = require("path");

let imageArr = [];

const storage = multer.diskStorage({
  //Nơi lưu
  destination: (req, file, cb) => {
    let destination = path.join("public", "uploads");
    //Nếu chưa có thì tạo
    if (req.session && req.session.user && req.session.user.id) {
      destination = path.join(destination, String(req.session.user.id));
    } else {
      destination = path.join(destination, "files");
    }
    if (!fs.existsSync(destination)) fs.mkdirSync(destination);
    cb(null, destination);
  },
  //Tên file
  filename: async (req, file, cb) => {
    const filename = `${moment().format("YYYY-MM-DD-hh-mm-ss")}-${
      file.originalname
    }`;
    imageArr.push(filename);
    cb(null, filename);
  }
});

const uploadImage = multer({
  storage,
  fileFilter: (req, file, cb) => {
    //Chỉ cho phép tải lên các loại ảnh png & jpg
    let math = ["image/png", "image/jpeg", "image/jpg"];
    if (math.indexOf(file.mimetype) === -1) {
      let errorMess = `The file <strong>${file.originalname}</strong> is invalid. Only allowed to upload image jpeg or png.`;
      return callback(errorMess, null);
    }
    cb(null, true);
  }
});

router.get("/add", requireLogin, async (req, res) => {
  const catList = await categoryModel.all();
  res.render("vwProducts/addProduct", {
    catList
  });
});

router.post(
  "/add",
  requireLogin,
  uploadImage.array("file"),
  async (req, res, next) => {
    const id=req.session.user.id;
    const entity = req.body;
    entity.id_seller = id;
    entity.startDate = moment().format("YYYY-MM-DD hh:mm:ss");
    entity.endDate = moment(entity.endDate).format("YYYY-MM-DD hh:mm:ss");
    try {
      await productModel.add(entity);
      const currentProductId = await productModel.getCurrentProductId();
      imageArr.map(async image => {
        await imageModel.add({
          id_product: currentProductId,
          src: `/uploads/${id}/${image}`
        });
      });
      imageArr = [];
      res.redirect(`/products/detail/${currentProductId}`);
    } catch (err) {
      console.log(err);
    }
  }
);

router.get("/detail/:id", async (req, res) => {
  const proId = req.params.id;
  const rows = await productModel.getProductByID(proId);
  const nameSeller = await productModel.getSellerProductByID(proId);
  const listHistory = await productModel.getListHistoryProduct(proId);
  const category = await homeModel.getCategories();
  const today = moment();
  var idUser = -1;
  if (req.session.user) {
    idUser = req.session.user.id;
  }
  const wishList = await storeModel.getWishListbyId(idUser);
  // console.log(helper(2,wishList));

  var timeStart = moment(rows[0].startDate);
  var s = today.diff(timeStart, "seconds");
  if (s <= 600) {
    rows[0].new = true;
  }
  for (let j = 0; j < wishList.length; j++) {
    if (helper.check(proId, wishList)) {
      rows[0].like = true;
    }
  }

  for (let i=0;i<listHistory.length;i++)
  {
    listHistory[i].time = moment(listHistory[i].time).format("YYYY-MM-DD hh:mm:ss");
    listHistory[i].fullname = helper.maskNameString(listHistory[i].fullname);
  }
  // mask name
 rows[0].fullname = helper.maskNameString(rows[0].fullname);



  var endDate = moment(rows[0].endDate);
  var timeleft = moment(endDate.diff(today));
  var stringTime = helper.convertTimeLeft(timeleft);
  rows[0].timeLeft = stringTime;
  
  res.render("vwProducts/product", {
    product: rows[0],
    idProduct: proId,
    history : listHistory,
    emptyHistory : listHistory.length===0,
    sellerName: nameSeller[0],
    allCategories: category
  });
});

module.exports = router;
