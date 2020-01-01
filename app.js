const express = require("express");
const exphbs = require("express-handlebars");
const hbs_sections = require("express-handlebars-sections");
const session = require("express-session");
const morgan = require("morgan");
const numeral = require("numeral");
require("express-async-errors");

const app = express();

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true
  })
);

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
    helpers: {
      section: hbs_sections(),
      format: val => numeral(val).format("0,0")
    }
  })
);
app.set("view engine", "hbs");

// require("./middlewares/locals.mdw")(app);
require("./middlewares/routes.mdw")(app);

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/product", (req, res) => {
  res.render("product");
});

// app.get("/store", (req, res) => {
//   res.render("store");
// });

app.get("/checkout", (req, res) => {
  res.render("checkout");
});

app.get("/blank", (req, res) => {
  res.render("blank");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

// app.get('/signin',(req,res)=>{
//   res.render('signin');
// });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listing at port ${PORT}!`);
});
