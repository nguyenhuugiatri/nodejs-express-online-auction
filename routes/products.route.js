const express = require("express");
const productModel = require("../models/products.model");
const categoryModel = require("../models/category.model");
const imageModel = require("../models/image.model");
const multer = require("multer");
const moment = require("moment");
const fs = require("fs");
const router = express.Router();

const id_seller = 1;
let imageArr = [];

const storage = multer.diskStorage({
  //Nơi lưu
  destination: (req, file, cb) => {
    const path = `public/uploads/${id_seller}`;
    //Nếu chưa có thì tạo
    if (!fs.existsSync(path)) fs.mkdirSync(path);
    cb(null, path);
  },
  //Tên file
  filename: async (req, file, cb) => {
    const filename = `${moment().format("YYYY-MM-DD hh:mm:ss")}-${
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

router.get("/add", async (req, res) => {
  const catList = await categoryModel.all();
  res.render("vwProducts/addProduct", {
    catList
  });
});

router.post("/add", uploadImage.array("file", 3), async (req, res, next) => {
  const entity = req.body;
  entity.id_seller = id_seller;
  entity.startDate = moment().format("YYYY-MM-DD hh:mm:ss");
  entity.endDate = moment(entity.endDate).format("YYYY-MM-DD hh:mm:ss");
  try {
    await productModel.add(entity);
    const currentProductId = await productModel.getCurrentProductId();
    imageArr.map(async image => {
      await imageModel.add({
        id_product: currentProductId[0]["max(id)"],
        src: `/uploads/${id_seller}/${image}`
      });
    });
    res.redirect("/products/detail/1");
  } catch (err) {
    console.log(err);
  }
});

router.get("/detail/:id", async (req, res) => {
  const proId = req.params.id;
  const rows = await productModel.getProductByID(proId);
  const nameSeller = await productModel.getSellerProductByID(proId);
  res.render("vwProducts/product", {
    product: rows[0],
    sellerName: nameSeller[0]
  });
});

module.exports = router;
