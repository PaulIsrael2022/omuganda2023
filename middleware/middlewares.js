var app = require("express")();
var express = require("express");

// isAuth - Middleware to check if the user is authenticated
exports.isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  };
  
  // authorize - Middleware to check if the user has the required role
  exports.authorize = (...roles) => {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).send('Unauthenticated');
      }
  
      if (!roles.includes(req.user.role)) {
        console.log("role array",roles)
        return res.status(403).send('Unauthorized');
      }
  
      next();
    };
  };
  

// middleware.js
exports.customMiddleware = () => {
  return (req, res, next) => {
    // Your custom middleware logic here
    if (req.isAuthenticated()) {
      res.locals.userRole = req.user.role; // Assuming user role is stored in req.user
    } else {
      res.locals.userRole = null;
    }

    next();
  };
};



