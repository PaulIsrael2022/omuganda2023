const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

// passport config
passport.use(new LocalStrategy({ usernameField: 'email' }, 
  async (email, password, done) => {
    try {
      // Find user by email
      const user = await User.findOne({ email }); 
      
      // Handle user not found
      if(!user) {
        return done(null, false, { message: 'Incorrect email' });  
      }
      
      // Validate password
      const isValid = await user.isValidPassword(password); 
      
      // Handle invalid password
      if(!isValid) {
        return done(null, false, { message: 'Incorrect password' });
      }
      
      // Return user
      return done(null, user);
    } catch(error) {
      return done(error);
    }
  }
));

// Serialize user
passport.serializeUser((user, done) => done(null, user.id));

// Deserialize user
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch(error) {
    done(error);
  }
});

module.exports = passport;