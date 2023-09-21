
const passport = require('../config/passport');

exports.login = (req, res, next) => {
    passport.authenticate('local', {
      failureRedirect: '/login',
      failureFlash: 'Invalid email or password' 
    })(req, res, next);
  }

exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      // Handle the error.
      console.log(err)
      return;
    }

    // Redirect to the login page.
    res.redirect('/login');
  });
  }
  