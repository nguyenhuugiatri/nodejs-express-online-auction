const express = require("express");
const productModel = require("../models/products.model");
const categoryModel = require("../models/category.model");
const userModel = require("../models/user.model");
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
const nodemailer = require("nodemailer");

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
    const id = req.session.user.id;
    const entity = req.body;
    entity.id_seller = id;
    entity.startDate = moment().format("YYYY-MM-DD HH:mm:ss");
    entity.endDate = moment(entity.endDate).format("YYYY-MM-DD HH:mm:ss");
    entity.startPrice = entity.currentPrice;
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
  const nameBidder = await productModel.getBidderProductByID(proId);
  const listHistory = await productModel.getListHistoryProduct(proId);
  const category = await homeModel.getCategories();
  const relatedproduct = await productModel.getRelatedProduct(rows[0].category);
  const today = moment();
  var idUser = -1;
  if (req.session.user) {
    idUser = req.session.user.id;
  }
  const wishList = await storeModel.getWishListbyId(idUser);
  // console.log(helper(2,wishList));
  const checkSeller = await productModel.checkIsSeller(idUser);
  const checkIsProduct = await productModel.checkIsMyProduct(idUser,proId);
  var isSeller =0;
  if (checkSeller.length!==0)
  {
    isSeller = checkSeller[0].permission;
  }
  var isMyProduct =0;
  if (checkIsProduct.length!==0)
  {
    isMyProduct=1;
  }
  console.log("AAAAAAAA" + isSeller);
  var timeStart = moment(rows[0].startDate);
  var s = today.diff(timeStart, "seconds");
  if (s <= 86400) {
    rows[0].new = true;
  }
  for (let j = 0; j < wishList.length; j++) {
    if (helper.check(proId, wishList)) {
      rows[0].like = true;
    }
  }

  for (let i = 0; i < listHistory.length; i++) {
    listHistory[i].time = moment(listHistory[i].time).format(
      "YYYY-MM-DD HH:mm:ss"
    );
    listHistory[i].fullname = helper.maskNameString(listHistory[i].fullname);
  }
  listHistory.reverse();
  // mask name
 if (rows[0].fullname!==null)
 {
  rows[0].fullname = helper.maskNameString(rows[0].fullname);
 }
 else rows[0].fullname = "Chưa có người đấu giá";

 if (nameBidder.length!==0)
 {
  nameBidder[0].fullname = helper.maskNameString(nameBidder[0].fullname);
 }

  var endDate = moment(rows[0].endDate).format("YYYY-MM-DD HH:mm:ss");
  // var timeleft = moment(endDate.diff(today));
  // var stringTime = helper.convertTimeLeft(timeleft);
  rows[0].timeLeft = endDate;
  rows[0].startDate = moment(rows[0].startDate).format("YYYY-MM-DD");
  rows[0].endDate = moment(rows[0].endDate).format("YYYY-MM-DD");

  // related product 
  const listNowTake = await userModel.getUserTakeNowProduct(idUser);
  // check dang giu gia
  for (let i = 0; i < relatedproduct.length; i++) {
    for (let j = 0; j < listNowTake.length; j++) {
      if (helper.checkCurrentPrice(relatedproduct[i].idproduct, listNowTake)) {
        relatedproduct[i].now = true;
      }
    }
  }
  for (let i = 0; i < relatedproduct.length; i++) {
    var productID = relatedproduct[i].idproduct; // lấy id product
    const thumbnailSrc = (await homeModel.getThumbnailByID(productID)).src;
    relatedproduct[i].thumbnailSrc = thumbnailSrc;
  }
  for (let i = 0; i < relatedproduct.length; i++) {
    var timeStart = moment(relatedproduct[i].startDate);
    var s = moment().diff(timeStart, "seconds");
    console.log(timeStart + " " + today + "a");
    if (s <= 86400) {
      relatedproduct[i].new = true;
    }
    for (let j = 0; j < wishList.length; j++) {
      if (helper.check(relatedproduct[i].idproduct, wishList)) {
        relatedproduct[i].like = true;
      }
    }
    if (relatedproduct[i].fullname !== null) {
      relatedproduct[i].fullname = helper.maskNameString(relatedproduct[i].fullname);
    } else relatedproduct[i].fullname = "Chưa có người đấu giá";
    var endDate = moment(relatedproduct[i].endDate).format("YYYY-MM-DD HH:mm:ss");
    // var timeleft = moment(endDate.diff(today));
    // var stringTime = helper.convertTimeLeft(timeleft);
    relatedproduct[i].timeLeft = endDate;
  }
  const bidderName=nameBidder[0]?nameBidder[0].fullname:'No Bidder';
  var isSellerProduct;
  if (isSeller===1)
    isSellerProduct=true;
    else
    isSellerProduct=false;
    var isOwnProduct;
    if (isMyProduct===1)
    isOwnProduct=true;
      else
      isOwnProduct=false;
  console.log(isSellerProduct + "BBBBBBBBBBBBBBBBBBBBBBBB");
  res.render("vwProducts/product", {
    product: rows[0],
    related: relatedproduct,
    images: rows,
    idProduct: proId,
    history: listHistory,
    emptyHistory: listHistory.length === 0,
    sellerName: nameSeller[0],
    bidderName,
    isSellerProduct,
    isOwnProduct,
    allCategories: category
  });
});

router.get("/showReview", async (req, res) => {
  try {
    const productID = req.query.productID;
    const review = await productModel.getFullReview(productID);
    const imgSrc = (await productModel.getThumbnailByID(productID)).src; // lấy source ảnh product
    console.log("log nee: " + review);
    var reviewFull = "";

    // lấy nội dung review
    for (let i = 0; i < review.length; i++) {
      var reviewerName = review[i].reviewerName;
      var reviewPoint = "0";
      if (review[i].marks == 1) reviewPoint = "+1";
      else reviewPoint = "-1";
      var reviewContent = "";
      if (review[i].review!="undefined") reviewContent += review[i].review;
      reviewFull += `<h3>${reviewerName}</h3><div> reviewed <span style="color: #D10024; font-weight: bold;">(${reviewPoint})</span></div>
      <p style="font-style:italic;">${reviewContent}</p>`;
    }
    return res.send({ reviewFull, imgSrc });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
