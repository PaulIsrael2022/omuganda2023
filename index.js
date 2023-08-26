var app = require("express")();
var express = require("express");
var path = require("path");
var http = require("http").Server(app);
var validator = require("express-validator");
let db = require("./config/dbconnect");
var AuthController = require("./controllers/AuthController");
const authRoute = require("./routers/authRoute");
var session = require("express-session");
let passport = require('./config/passport.js');
const flash = require('connect-flash');
// var bodyParser = require("body-parser");
var i18n = require("i18n-express");
var pageRouter = require("./routers/route");


// Add urlencoded parsing middleware
app.use(express.urlencoded({ extended: false }));
app.use(flash());

app.use(
  session({
    key: "user_sid",
    secret: "somerandonstuffs",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 1200000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

  
app.use(flash());
app.use(
  i18n({
    translationsPath: path.join(__dirname, "i18n"), // <--- use here. Specify translations files path.
    siteLangs: ["es", "en", "de", "ru", "it", "fr"],
    textsVarName: "translation",
  })
);
app.use("/public", express.static("public"));


app.get("/layouts/", function (req, res) {
  res.render("view");
});

// apply controller
AuthController(app);

//For set layouts of html view
var expressLayouts = require("express-ejs-layouts");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressLayouts);

app.use("/", authRoute);
// Define All Route
pageRouter(app);

app.get("/", function (req, res) {
  res.redirect("/");
});

http.listen(8000, function () {
  console.log("listening on *:8000");
});
