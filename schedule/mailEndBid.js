const productModel = require("./../models/products.model");
const homeModel = require("./../models/home.model");
const userModel = require("./../models/user.model");
const axios = require("axios");
const CronJob = require("cron").CronJob;

const job = new CronJob({
  cronTime: "* * * * *",
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

    const autoBidTable = await homeModel.getAutoBidTable();
    for (const autoBid of autoBidTable) {
      const currentWinner = await homeModel.getCurrentWinner(
        autoBid.id_product
      );
      if (currentWinner.id_bidder === null) {
        const currentPrice = await homeModel.getCurrentPrice(
          autoBid.id_product
        );
        await axios({
          method: "get",
          url: `http://localhost:3000/bidding?userid=${
            autoBid.id_user
          }&idproduct=${
            autoBid.id_product
          }&bidprice=${currentPrice.currentPrice + autoBid.bidStep}`
        });
      } else {
        if (currentWinner.id_bidder !== autoBid.id_user) {
          const currentPrice = await homeModel.getCurrentPrice(
            autoBid.id_product
          );
          if (currentPrice.currentPrice + autoBid.bidStep <= autoBid.price) {
            await axios({
              method: "get",
              url: `http://localhost:3000/bidding?userid=${
                autoBid.id_user
              }&idproduct=${
                autoBid.id_product
              }&bidprice=${currentPrice.currentPrice + autoBid.bidStep}`
            });
          }else{
            console.log("Stop");
          }
        }
      }
    }
  },
  start: true,
  timeZone: "Asia/Ho_Chi_Minh"
});

module.exports = job;
