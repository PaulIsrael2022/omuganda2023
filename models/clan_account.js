const mongoose = require('mongoose');
const User = require('./user');
const Schema = mongoose.Schema;

// Define Clan Head Fmily Tree schema
const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
  name: String,
  dateOfBirth: Date,
  dateOfDeath: {
    type: Date,
    default: null
  },
  gender: String,
  placeOfBirth: String,

  clanHead: {
    type: Boolean,
    default: false
  },
  yearsAsClanHead: string,
  
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person'
  },
  children: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person'
  }]
});

const FamilyTree = mongoose.model('FamilyTree', PersonSchema);

//History
// Define a Mongoose schema for clan history
const clanHistorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  paragraph: {
    type: String,
    required: true,
  },
});

// Create a Mongoose model based on the schema
const ClanHistory = mongoose.model('ClanHistory', clanHistorySchema);

// notable memebers
// Define a Mongoose schema for noteworthy clan members
const noteworthyMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  roleInClan: {
    type: String,
    required: true,
  },
  skills: {
    type: [String], // Assuming skills are represented as an array of strings
  },
});

// Create a Mongoose model based on the schema
const NoteworthyClanMember = mongoose.model('NoteworthyClanMember', noteworthyMemberSchema);

// traditions
// Define a Mongoose schema for traditions
const traditionSchema = new mongoose.Schema({
  traditionName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  origins: {
    type: String,
  },
  celebration: {
    type: String,
  },
  practices: {
    type: [String], // Assuming practices are represented as an array of strings
  },
});

// Create a Mongoose model based on the schema
const Tradition = mongoose.model('Tradition', traditionSchema);

// Oral Histories

// Media Gallery

// Members List

// Profile
// Define a Mongoose schema
const clanProfileSchema = new mongoose.Schema({
  clanName: {
    type: String,
    required: true,
  },
  clanMotto: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // You can add additional validation for email format if needed
  },
  bio: {
    type: String,
  },
  clanDescription: {
    type: String,
  },
  leadershipHierarchy: [
    {
      leaderName: {
        type: String,
        required: true,
      },
      title: {
        type: String,
      },
    },
  ],
});


// Create a Mongoose model based on the schema
const ClanProfile = mongoose.model('Clan', clanProfileSchema);
// Settings and Billing

module.exports = {
  ClanMember: mongoose.model('ClanMember', clanMemberSchema),
  FamilyTree: mongoose.model('FamilyTree', PersonSchema),
  ClanHistory: mongoose.model('ClanHistory', clanHistorySchema),
  NoteworthyClanMember: mongoose.model('NoteworthyClanMember', noteworthyMemberSchema),
  Tradition: mongoose.model('Tradition', traditionSchema),
  ClanProfile: mongoose.model('Clan', clanProfileSchema),
};