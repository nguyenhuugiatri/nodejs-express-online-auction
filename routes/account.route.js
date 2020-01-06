const express = require("express");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const helper = require("./../utils/helper");
const userModel = require("../models/user.model");
const productsModel = require("../models/products.model");
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
  checkExist = await userModel.singleByEmailUsername(
    req.body.username,
    req.body.email
  );
  if (checkExist !== null) {
    return res.render("vwAccount/signup", {
      layout: false,
      message: "account exist"
    });
  }

  const N = 10;
  const hash = bcrypt.hashSync(req.body.password, N);
  const entity = req.body;
  entity.password = hash;
  entity.fullname = entity.firstName + " " + entity.lastName;
  entity.gender = parseInt(entity.gender);
  entity.joindate = moment().format(moment.HTML5_FMT.DATE);

  delete entity.repassword;
  delete entity.lastName;
  delete entity.firstName;
  delete entity["g-recaptcha-response"];
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
  const row_user = await userModel.singleByID(userId);
  const rows = await userModel.getWishListbyID(userId);
  const category = await homeModel.getCategories();
  const listSeller = await userModel.getListProductOfSeller(userId);
  const listBidding = await userModel.getListProductOfBidding(userId);
  const listNowTake = await userModel.getUserTakeNowProduct(userId);
  const listWon = await userModel.getListProductOfWon(userId);
  const listAuctioned = await userModel.getListProductAuctioned(userId);

  // lấy thumbnail source cho product
  for (let i = 0; i < rows.length; i++) {
    // rows là danh sách sản phẩm wishlist
    var productID = rows[i].id; // lấy id product
    const thumbnailSrc = (await userModel.getThumbnailByID(productID)).src;
    rows[i].thumbnailSrc = thumbnailSrc;
  }
  for (let i = 0; i < listSeller.length; i++) {
    var productID = listSeller[i].id; // lấy id product
    const thumbnailSrc = (await userModel.getThumbnailByID(productID)).src;
    listSeller[i].thumbnailSrc = thumbnailSrc;
  }
  for (let i = 0; i < listBidding.length; i++) {
    var productID = listBidding[i].id; // lấy id product
    const thumbnailSrc = (await userModel.getThumbnailByID(productID)).src;
    listBidding[i].thumbnailSrc = thumbnailSrc;
  }
  for (let i = 0; i < listWon.length; i++) {
    var productID = listWon[i].id; // lấy id product
    const thumbnailSrc = (await userModel.getThumbnailByID(productID)).src;
    listWon[i].thumbnailSrc = thumbnailSrc;

    // lấy điểm đánh giá của seller
    const sellerPoint = (
      await userModel.getReviewPointByUser(productID, listWon[i].id_seller)
    );
    if (sellerPoint!=null) listWon[i].sellerPoint = sellerPoint.marks;
    else listWon[i].sellerPoint = -2;
    // lấy điểm đánh giá của winner
    const winnerPoint = (
      await userModel.getReviewPointByUser(productID, listWon[i].id_bidder)
    );
    if (winnerPoint!=null) listWon[i].winnerPoint = winnerPoint.marks;
    else listWon[i].winnerPoint = -2;
  }
  for (let i = 0; i < listAuctioned.length; i++) {
    var productID = listAuctioned[i].id; // lấy id product
    const thumbnailSrc = (await userModel.getThumbnailByID(productID)).src;
    listAuctioned[i].thumbnailSrc = thumbnailSrc;

     // lấy điểm đánh giá của seller
     const sellerPoint = (
      await userModel.getReviewPointByUser(productID, listAuctioned[i].id_seller)
    );
    if (sellerPoint!=null) listAuctioned[i].sellerPoint = sellerPoint.marks;
    else listAuctioned[i].sellerPoint = -2;
    // lấy điểm đánh giá của winner
    const winnerPoint = (
      await userModel.getReviewPointByUser(productID, listAuctioned[i].id_bidder)
    );
    if (winnerPoint!=null) listAuctioned[i].winnerPoint = winnerPoint.marks;
    else listAuctioned[i].winnerPoint = -2;
  }

  //format lại ngày
  row_user[0].joindate = moment(row_user[0].joindate).format("YYYY-MM-DD");

  var listWonFromYou = null;
  var listAuctionedForYou = null;

  const your = req.session.user;
  if (your) {
    yourID = your.id;
    listWonFromYou = await userModel.getListProductOfWonFromYou(userId, yourID);
    // lấy thumbnail source cho product
    for (let i = 0; i < listWonFromYou.length; i++) {
      var productID = listWonFromYou[i].id; // lấy id product
      const thumbnailSrc = (await userModel.getThumbnailByID(productID)).src;
      listWonFromYou[i].thumbnailSrc = thumbnailSrc;
    }

    // cho biết bạn đã review sản phẩm mà người đó đã won chưa
    for (let i = 0; i < listWonFromYou.length; i++) {
      var id_product_won_from_you = listWonFromYou[i].id;
      const isReview = await userModel.isReviewedBySellerYou(
        id_product_won_from_you,
        yourID
      );
      if (isReview) listWonFromYou[i].isReview = 1;
      else listWonFromYou[i].isReview = 0;
    }
    // cho biết bạn đã review sản phẩm bạn đã won này chưa
    for (let i = 0; i < listWon.length; i++) {
      var id_product_won = listWon[i].id;
      const isReview2 = await userModel.isReviewedByWinner(id_product_won);
      if (isReview2) listWon[i].isReview = 1;
      else listWon[i].isReview = 0;
      // bạn có được phép review hay không
      if (userId == yourID && listWon[i].isReview === 0)
        listWon[i].Reviewable = 1;
      //được review
      else if (userId != yourID && listWon[i].isReview === 0)
        listWon[i].Reviewable = 0;
      //chưa review
      else if (userId == yourID && listWon[i].isReview === 1)
        listWon[i].Reviewable = -1;
      // bạn đã review
      else listWon[i].Reviewable = -2; // người khác đã review
    }

    listAuctionedForYou = await userModel.getListProductAuctionedForYou(
      userId,
      yourID
    );
    // lấy thumbnail source cho product
    for (let i = 0; i < listAuctionedForYou.length; i++) {
      var productID = listAuctionedForYou[i].id; // lấy id product
      const thumbnailSrc = (await userModel.getThumbnailByID(productID)).src;
      listAuctionedForYou[i].thumbnailSrc = thumbnailSrc;
    }

    // cho biết bạn đã review sản phẩm mà người đó đã mua chưa
    for (let i = 0; i < listAuctionedForYou.length; i++) {
      var id_product_auctioned_for_you = listAuctionedForYou[i].id;
      const isReview = await userModel.isReviewedByWinnerYou(
        id_product_auctioned_for_you,
        yourID
      );
      if (isReview) listAuctionedForYou[i].isReview = 1;
      else listAuctionedForYou[i].isReview = 0;
    }
    // cho biết bạn đã review sản phẩm bạn đã mua này chưa
    for (let i = 0; i < listAuctioned.length; i++) {
      var id_product_auctioned = listAuctioned[i].id;
      const isReview2 = await userModel.isReviewedBySeller(
        id_product_auctioned
      );
      if (isReview2) listAuctioned[i].isReview = 1;
      else listAuctioned[i].isReview = 0;
      // bạn có được phép review hay không
      if (userId == yourID && listAuctioned[i].isReview === 0)
        listAuctioned[i].Reviewable = 1;
      //được review
      else if (userId != yourID && listAuctioned[i].isReview === 0)
        listAuctioned[i].Reviewable = 0;
      //chưa review
      else if (userId == yourID && listAuctioned[i].isReview === 1)
        listAuctioned[i].Reviewable = -1;
      // bạn đã review
      else listAuctioned[i].Reviewable = -2; // người khác đã review
    }
  }

  // lấy điểm review từ database
  const number_of_reviews = (await userModel.getNumberOfReviews(userId))
    .number_of_reviews;
  const positive_reviews = (await userModel.getNumberOfPositiveReviews(userId))
    .positive_reviews;
  var ratingPoint = 0;
  var ratingDescription =
    positive_reviews + "/" + number_of_reviews + " reviews";
  // console.log("number_of_reviews" + number_of_reviews);////////
  // console.log("positive_reviews" + positive_reviews);////////
  if (number_of_reviews === 0) {
    ratingPoint = 0;
    ratingDescription = "There are no reviews yet";
  } else ratingPoint = (positive_reviews / number_of_reviews) * 100;
  //console.log(ratingPoint);/////////////////////////////////////////////////////////////

  //Check product co dang giu gia khong?
  for (let i = 0; i < listBidding.length; i++) {
    for (let j = 0; j < listNowTake.length; j++) {
      if (helper.checkCurrentPrice(listBidding[i].id_product, listNowTake)) {
        listBidding[i].now = true;
      }
    }
  }
  // check NEW
  const today = moment();
  for (let i = 0; i < rows.length; i++) {
    var timeStart = moment(rows[i].startDate);
    var s = today.diff(timeStart, "seconds");
    if (s <= 600) {
      rows[i].new = true;
    }
  }
  for (let i = 0; i < rows.length; i++) {
    var timeStart = moment(rows[i].startDate);
    var s = today.diff(timeStart, "seconds");
    rows[i].timeLeft = moment(rows[i].endDate).format("YYYY-MM-DD HH:mm:ss");
    if (s <= 600) {
      rows[i].new = true;
    }
  }
  for (let i = 0; i < listSeller.length; i++) {
    var timeStart = moment(listSeller[i].startDate);
    var s = today.diff(timeStart, "seconds");
    listSeller[i].timeLeft = moment(listSeller[i].endDate).format(
      "YYYY-MM-DD HH:mm:ss"
    );
    if (s <= 600) {
      listSeller[i].new = true;
    }
  }
  for (let i = 0; i < listBidding.length; i++) {
    var timeStart = moment(listBidding[i].startDate);
    listBidding[i].timeLeft = moment(listBidding[i].endDate).format(
      "YYYY-MM-DD HH:mm:ss"
    );
    var s = today.diff(timeStart, "seconds");
    if (s <= 600) {
      listBidding[i].new = true;
    }
  }
  for (let i = 0; i < listWon.length; i++) {
    var timeStart = moment(listWon[i].startDate);
    var s = today.diff(timeStart, "seconds");
    // listWon[i].timeLeft = moment(listWon[i].endDate).format("YYYY-MM-DD HH:mm:ss");
    if (s <= 600) {
      listWon[i].new = true;
    }
  }

  res.render("vwAccount/profile", {
    profile: row_user,
    ratingPoint: ratingPoint,
    ratingDescription: ratingDescription,
    productSeller: listSeller,
    productBidding: listBidding,
    productWon: listWon,
    productAutioned: listAuctioned,
    products: rows,
    empty: rows.length === 0,
    allCategories: category,
    idUSer: userId,
    listWonFromYou: listWonFromYou,
    listAuctionedForYou: listAuctionedForYou
  });
});

router.get("/profile/:id/edit", requireLogin, async (req, res) => {
  const userId = req.params.id;
  if (req.session.user.id != userId) {
    return res.render("notFound", {
      message: "non permission"
    });
  }
  const row_user = await userModel.singleByID(userId);
  //format lại ngày
  row_user[0].joindate = moment(row_user[0].joindate).format("YYYY-MM-DD");
  res.render("vwAccount/edit", {
    editProfile: row_user
  });
});

router.post("/profile/:id/edit", requireLogin, async (req, res) => {
  const userId = req.session.user.id;

  const entity = req.body;
  const result = await userModel.update(entity, userId);
  const url = "/account/profile/" + userId;
  res.redirect(url);
});

router.get(
  "/profile/:id/edit/changePassword",
  requireLogin,
  async (req, res) => {
    const userId = req.params.id;
    if (req.session.user.id != userId) {
      return res.render("notFound", {
        message: "non permission"
      });
    }
    const row_user = await userModel.singleByID(userId);
    res.render("vwAccount/changePassword", {
      changePassword: row_user
    });
  }
);

router.post(
  "/profile/:id/edit/changePassword",
  requireLogin,
  async (req, res) => {
    const userId = req.session.user.id;

    const password = req.body.password;
    const newPassword = req.body.newPassword;
    const rePassword = req.body.rePassword;
    // xử lý mật khẩu hợp lệ (validate)
    // kiểm tra password đúng

    const user = await userModel.singleRowByID(userId);

    const rs = bcrypt.compareSync(password, user.password);
    if (!rs) {
      req.flash("error", "wrong password");
      res.redirect(req.get("referer"));
    }

    // kiểm tra rePassword khớp với newPassword (xử lý trong changePassword.js)

    // mã hóa newPassword đưa vào database
    const N = 10;
    const hashedPassword = bcrypt.hashSync(newPassword, N);

    const result = await userModel.changePass(hashedPassword, userId);
    const url = "/account/profile/" + userId;
    res.redirect(url);
  }
);

router.get("/addWishList", requireLogin, async (req, res) => {
  var jsonGet = {};
  jsonGet = req.query;
  var idUser, idProduct;
  for (const key in jsonGet) {
    if (key === "userid") idUser = jsonGet[key];
    if (key === "idproduct") idProduct = jsonGet[key];
  }
  const checkExist = await userModel.checkWishList(idUser, idProduct);
  if (checkExist.length === 0) {
    await userModel.addWishList(idUser, idProduct);
    return res.send("Add Success");
  } else {
    await userModel.deleteWishList(idUser, idProduct);
    return res.send("Delete Success");
  }
});

router.get("/profile/:id/search", async (req, res) => {
  const userId = req.params.id;
  console.log(req.query);
  const row_user = await userModel.singleByID(userId);
  const rows = await userModel.getWishListbyID_Name(
    userId,
    req.query.nameproduct
  );
  const listSeller = await userModel.getListProductOfSeller(userId);
  const listBidding = await userModel.getListProductOfBidding(userId);
  const listNowTake = await userModel.getUserTakeNowProduct(userId);
  const listWon = await userModel.getListProductOfWon(userId);

  const category = await homeModel.getCategories();
  // lấy điểm review từ database
  const number_of_reviews = (await userModel.getNumberOfReviews(userId))
    .number_of_reviews;
  const positive_reviews = (await userModel.getNumberOfPositiveReviews(userId))
    .positive_reviews;
  var ratingPoint = 0;
  var ratingDescription =
    positive_reviews + "/" + number_of_reviews + " reviews";
  // console.log("number_of_reviews" + number_of_reviews);////////
  // console.log("positive_reviews" + positive_reviews);////////
  if (number_of_reviews === 0) {
    ratingPoint = 0;
    ratingDescription = "There are no reviews yet";
  } else ratingPoint = (positive_reviews / number_of_reviews) * 100;
  //console.log(ratingPoint);/////////////////////////////////////////////////////////////

  //Check product co dang giu gia khong?
  for (let i = 0; i < listBidding.length; i++) {
    for (let j = 0; j < listNowTake.length; j++) {
      if (helper.checkCurrentPrice(listBidding[i].id_product, listNowTake)) {
        listBidding[i].now = true;
      }
    }
  }
  // check NEW
  const today = moment();
  for (let i = 0; i < rows.length; i++) {
    var timeStart = moment(rows[i].startDate);
    var s = today.diff(timeStart, "seconds");
    if (s <= 600) {
      rows[i].new = true;
    }
  }
  for (let i = 0; i < listSeller.length; i++) {
    var timeStart = moment(listSeller[i].startDate);
    var s = today.diff(timeStart, "seconds");
    if (s <= 600) {
      listSeller[i].new = true;
    }
  }
  for (let i = 0; i < listBidding.length; i++) {
    var timeStart = moment(listBidding[i].startDate);
    var s = today.diff(timeStart, "seconds");
    if (s <= 600) {
      listBidding[i].new = true;
    }
  }
  for (let i = 0; i < listWon.length; i++) {
    var timeStart = moment(listWon[i].startDate);
    var s = today.diff(timeStart, "seconds");
    if (s <= 600) {
      listWon[i].new = true;
    }
  }
  res.render("vwAccount/profile", {
    profile: row_user,
    ratingPoint: ratingPoint,
    ratingDescription: ratingDescription,
    products: rows,
    productSeller: listSeller,
    productBidding: listBidding,
    productWon: listWon,
    empty: rows.length === 0,
    allCategories: category,
    idUSer: userId
  });
});

router.get("/sendReviewByWinner", async (req, res) => {
  try {
    const productID = req.query.idProduct;
    const content = req.query.content;
    const point = req.query.point;
    const reviewerID = req.session.user.id;
    const userID = (await userModel.getIDSeller(productID)).id_seller;
    const timeNow = moment().format("YYYY-MM-DD hh:mm:ss");

    const addReview = await userModel.addReview(
      productID,
      userID,
      reviewerID,
      content,
      point,
      timeNow
    );

    const daXuli =
      "You +" +
      point +
      " point for this auction (" +
      productID +
      ") with description: " +
      content;
    return res.send(daXuli);
  } catch (err) {
    console.log(err);
  }
});

router.get("/sendReviewBySeller", async (req, res) => {
  try {
    const productID = req.query.idProduct;
    const content = req.query.content;
    const point = req.query.point;
    const reviewerID = req.session.user.id;
    const userID = (await userModel.getIDWinner(productID)).id_bidder;
    const timeNow = moment().format("YYYY-MM-DD hh:mm:ss");

    const addReview = await userModel.addReview(
      productID,
      userID,
      reviewerID,
      content,
      point,
      timeNow
    );

    const daXuli =
      "You +" +
      point +
      " point for this auction (" +
      productID +
      ") with description: " +
      content;
    return res.send(daXuli);
  } catch (err) {
    console.log(err);
  }
});

router.get("/sendUpgradeRequest", async (req, res) => {
  try {
    const userID = req.query.userID;

    const sendUpgradeRequest = await userModel.sendUpgradeRequest(userID);

    const daXuli = "You have sent Upgrade Request successfully!";
    return res.send(daXuli);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
