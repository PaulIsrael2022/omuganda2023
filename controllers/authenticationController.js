
const passport = require('../config/passport');

exports.login = (req, res, next) => {
    passport.authenticate('local', {
      failureRedirect: '/login',
      failureFlash: 'Invalid email or password' 
    })(req, res, next);
  }

exports.logout = (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/login');
  }
  