const productModel = require("./../models/products.model");
const userModel = require("./../models/user.model");
const axios = require("axios");
const CronJob = require("cron").CronJob;

const job = new CronJob({
  //Thực hiện mỗi 5s
  cronTime: "*/5 * * * *",
  onTick: async () => {
    console.log("Cron job runing...");
    const products = await productModel.getProductsEndBid();
    if (!products) console.log("Cron finish...");
    for (const p of products) {
      const bidder = await productModel.getBidderOfProduct(p.id);
      const seller = await productModel.getSellerOfProduct(p.id);
      //Nếu sản phẩm không có ai đấu giá
      if (!bidder) {
        //Gửi mail cho seller đấu giá thất bại
        await axios({
          method: "post",
          url: "http://localhost:3000/email/send-seller",
          data: {
            email: seller.email,
            productName: p.name,
            isBidd: false
          }
        });
      } else {
        //Gửi mail cho bidder đấu giá thành công
        await axios({
          method: "post",
          url: "http://localhost:3000/email/send-bidder",
          data: {
            email: bidder.email,
            productName: p.name,
            sellerName: seller.fullname
          }
        });

        //Gửi mail cho seller đấu giá thành công
        await axios({
          method: "post",
          url: "http://localhost:3000/email/send-seller",
          data: {
            email: seller.email,
            productName: p.name,
            isBidd: true,
            bidderName: bidder.fullname
          }
        });
      }

      await productModel.updateIsSentEmail(p.id);
      await productModel.updateAuctionedStatus(p.id);
    }
  },
  start: true,
  timeZone: "Asia/Ho_Chi_Minh"
});

module.exports = job;
