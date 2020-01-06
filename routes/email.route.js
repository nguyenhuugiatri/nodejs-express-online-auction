const nodemailer = require("nodemailer");
const express = require("express");
const router = express.Router();

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

router.post("/bidding-confirm", function(req, res) {
  const { email, bidPrice, productName, bidTime } = req.body;
  const content = `
        <div style="padding: 10px; background-color: #003375">
            <div style="padding: 25px; background-color: white;">
                <h4 style="color: #D10024; margin-top:0;margin-bottom:0px; font-size:30px">Online Auction</h4>
                <span style="margin:10px;display:block;color: black">We confirm that you have successfully bidded ${productName} with ${bidPrice} VND at ${bidTime}.</span>
                <span style="margin-left:10px;display:block;color: black">Thank you,</span>
                <span style="margin-left:10px;display:block;color: black">Online Auction</span>
            </div>
        </div>
    `;

  var mainOptions = {
    from: "Online Auction",
    to: email,
    subject: "Confirm Email",
    text: "Please no-reply",
    html: content
  };

  transporter.sendMail(mainOptions, function(err, info) {
    if (err) {
      console.log(err);
      return res.send("Error: " + err);
    } else {
      console.log("Sent: " + info.response);
      return res.send("Success: " + info.response);
    }
  });
});

router.post("/deny", function(req, res) {
  const { email, productName, denyTime } = req.body;
  const content = `
        <div style="padding: 10px; background-color: #003375">
            <div style="padding: 25px; background-color: white;">
                <h4 style="color: #D10024; margin-top:0;margin-bottom:0px; font-size:30px">Online Auction</h4>
                <span style="margin:10px;display:block;color: black">We notify that you have been blocked from ${productName} by seller at ${denyTime}.</span>
                <span style="margin-left:10px;display:block;color: black">Sorry for inconvenience,</span>
                <span style="margin-left:10px;display:block;color: black">Online Auction</span>
            </div>
        </div>
    `;

  var mainOptions = {
    from: "Online Auction",
    to: email,
    subject: "Notify Email",
    text: "Please no-reply",
    html: content
  };

  transporter.sendMail(mainOptions, function(err, info) {
    if (err) {
      console.log(err);
      return res.send("Error: " + err);
    } else {
      console.log("Sent: " + info.response);
      return res.send("Success: " + info.response);
    }
  });
});

router.post("/send-seller", function(req, res) {
  const { email, productName, isBidd } = req.body;
  let message;
  if (isBidd) {
    const { bidderName } = req.body;
    message = `Your product: ${productName} has been successfully auctioned by ${bidderName}.`;
  } else message = `We notify that your ${productName} has expired without a buyer.`;
  const content = `
        <div style="padding: 10px; background-color: #003375">
            <div style="padding: 25px; background-color: white;">
                <h4 style="color: #D10024; margin-top:0;margin-bottom:0px; font-size:30px">Online Auction</h4>
                <span style="margin:10px;display:block;color: black">${message}</span>
                <span style="margin-left:10px;display:block;color: black">Best regards,</span>
                <span style="margin-left:10px;display:block;color: black">Online Auction</span>
            </div>
        </div>
    `;

  var mainOptions = {
    from: "Online Auction",
    to: email,
    subject: "Notify Email",
    text: "Please no-reply",
    html: content
  };

  transporter.sendMail(mainOptions, function(err, info) {
    if (err) {
      console.log(err);
      return res.send("Error: " + err);
    } else {
      console.log("Sent: " + info.response);
      return res.send("Success: " + info.response);
    }
  });
});

router.post("/send-bidder", function(req, res) {
  const { email, productName, sellerName } = req.body;
  message = `Congratulations, you have successfully bid for the ${productName} by ${sellerName}`;
  const content = `
        <div style="padding: 10px; background-color: #003375">
            <div style="padding: 25px; background-color: white;">
                <h4 style="color: #D10024; margin-top:0;margin-bottom:0px; font-size:30px">Online Auction</h4>
                <span style="margin:10px;display:block;color: black">${message}</span>
                <span style="margin-left:10px;display:block;color: black">Best regards,</span>
                <span style="margin-left:10px;display:block;color: black">Online Auction</span>
            </div>
        </div>
    `;

  var mainOptions = {
    from: "Online Auction",
    to: email,
    subject: "Notify Email",
    text: "Please no-reply",
    html: content
  };

  transporter.sendMail(mainOptions, function(err, info) {
    if (err) {
      console.log(err);
      return res.send("Error: " + err);
    } else {
      console.log("Sent: " + info.response);
      return res.send("Success: " + info.response);
    }
  });
});

module.exports = router;
