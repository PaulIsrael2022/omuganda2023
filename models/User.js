const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {FamilyTree, ClanHistory, NoteworthyClanMember, Tradition, ClanProfile } = require("../models/clan_account");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }, 
  role: {
    type: String,
    enum: ['user', 'clan', 'admin'],
    default: 'user' 
  },
claninfo: {
  clan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClanProfile',
  },
  familyTree: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FamilyTree',
  },
  clanHistory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClanHistory',
  },
  noteworthyClanMember: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NoteworthyClanMember',
  },
  traditions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tradition',
  }],
}
});

// Hash password before saving 
UserSchema.pre('save', async function(next) {
  const user = this;

  if(user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  
  next();
});

// Rename to match passport config
UserSchema.methods.isValidPassword = function(password) {
  const user = this;

  // Use bcrypt.compareSync
  return bcrypt.compareSync(password, user.password);
}

const User = mongoose.model('User', UserSchema);

module.exports = User;