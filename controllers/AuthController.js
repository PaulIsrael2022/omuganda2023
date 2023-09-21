var express = require("express");
var bodyParser = require("body-parser");
var urlencodeParser = bodyParser.urlencoded({ extended: false });
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const passport = require('../config/passport');

var validator = require("express-validator");

var axios = require("axios");
var MockAdapter = require("axios-mock-adapter");

module.exports = function (app) {
  // Inner Auth
  app.get("/pages-login", function (req, res) {
    res.locals = { title: "Login 1" };
    res.render("AuthInner/pages-login");
  });
  app.get("/pages-register", function (req, res) {
    res.locals = { title: "Register 1" };
    res.render("AuthInner/pages-register");
  });
  app.get("/pages-recoverpw", function (req, res) {
    res.locals = { title: "Recover Password 1" };
    res.render("AuthInner/pages-recoverpw");
  });
  app.get("/pages-lock-screen", function (req, res) {
    res.locals = { title: "Lock Screen 1" };
    res.render("AuthInner/pages-lock-screen");
  });

  // Extra Pages

  app.get("/pages-404", function (req, res) {
    res.locals = { title: "Error 404" };
    res.render("Pages/pages-404");
  });
  app.get("/pages-500", function (req, res) {
    res.locals = { title: "Error 500" };
    res.render("Pages/pages-500");
  });
  app.get("/pages-comingsoon", function (req, res) {
    res.locals = { title: "Coming Soon" };
    res.render("Pages/pages-comingsoon");
  });
  app.get("/pages-maintenance", function (req, res) {
    res.locals = { title: "Maintenance" };
    res.render("Pages/pages-maintenance");
  });
  app.get("/pages-email-verification", function (req, res) {
    res.locals = { title: "Email Verification" };
    res.render("Pages/pages-email-verification");
  });
  app.get("/pages-confirm-mail", function (req, res) {
    res.locals = { title: "Email Verification" };
    res.render("Pages/pages-confirm-mail");
  });
  app.get("/pages-two-step-verification", function (req, res) {
    res.locals = { title: "Email Verification" };
    res.render("Pages/pages-two-step-verification");
  });

  app.get("/register", function (req, res) {
    if (req.user) {
      res.redirect("Dashboard/index");
    } else {
      res.render("Auth/auth-register", {
        message: req.flash("message"),
        error: req.flash("error"),
      });
    }
  });

  
  app.get("/login", function (req, res) {
    res.render("Auth/auth-login", {
      message: req.flash("message"),
      error: req.flash("error"),
    });
  });

  app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login', 
  failureFlash: true }),
  (req, res) => {
    //check the user's role
    if (req.user.role === 'admin' || req.user.role === 'clan') {
      //redirect to clan dashboard
      res.redirect('/clan-profile');
    } else if (req.user.role === 'user') {
      //redirect to user dashboard
      res.redirect('/user-dashboard');
    } else {
      //redirect to default route
      res.redirect('/login');
    }
  }
);

  app.get("/forgot-password", function (req, res) {
    res.render("Auth/auth-forgot-password", {
      message: req.flash("message"),
      error: req.flash("error"),
    });
  });

  app.post("/post-forgot-password", urlencodeParser, function (req, res) {
    const validUser = users.filter((usr) => usr.email === req.body.email);
    if (validUser["length"] === 1) {
      req.flash("message", "We have e-mailed your password reset link!");
      res.redirect("/forgot-password");
    } else {
      req.flash("error", "Email Not Found !!");
      res.redirect("/forgot-password");
    }
  });
};
