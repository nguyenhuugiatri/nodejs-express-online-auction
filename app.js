const express = require("express");
const exphbs = require("express-handlebars");
const hbs_sections = require("express-handlebars-sections");
const session = require("express-session");
const morgan = require("morgan");
const numeral = require("numeral");
require("express-async-errors");
const cors = require("cors");
var flash = require("express-flash");
const job = require("./schedule/mailEndBid");
job.start();

const app = express();

app.use(cors());
app.use(
  session({
    secret: "anhem1nha",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 15
    }
  })
);

app.use(function(req, res, next) {
  res.locals.session = req.session;
  next();
});

app.use(morgan("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(express.static(__dirname + "/public"));

app.engine(
  "hbs",
  exphbs({
    defaultLayout: "main.hbs",
    layoutsDir: "views/_layouts",
    partialsDir: "views/partials",
    helpers: {
      section: hbs_sections(),
      format: val => numeral(val).format("0,0"),
      when: function(operand_1, operator, operand_2, options) {
        var operators = {
            eq: function(l, r) {
              return l == r;
            },
            noteq: function(l, r) {
              return l != r;
            },
            gt: function(l, r) {
              return Number(l) > Number(r);
            },
            or: function(l, r) {
              return l || r;
            },
            and: function(l, r) {
              return l && r;
            },
            "%": function(l, r) {
              return l % r === 0;
            }
          },
          result = operators[operator](operand_1, operand_2);

        if (result) return options.fn(this);
        else return options.inverse(this);
      },
      times: function(n, block) {
        var accum = "";
        for (var i = 1; i < n+1; ++i) accum += block.fn(i);
        return accum;
      }
    }
  })
);
app.set("view engine", "hbs");
app.use(flash());

// require("./middlewares/locals.mdw")(app);
require("./middlewares/routes.mdw")(app);

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/product", (req, res) => {
  res.render("product");
});

app.get("/checkout", (req, res) => {
  res.render("checkout");
});

app.use(function(req, res, next) {
  res.status(404);
  if (req.accepts("html")) {
    res.render("notFound", { url: req.url });
    return;
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}!`);
});
