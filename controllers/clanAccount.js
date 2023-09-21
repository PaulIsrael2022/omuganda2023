const express = require("express");
const router = express.Router();
const User = require("../models/User");
const {FamilyTree, ClanHistory, NoteworthyClanMember, Tradition, ClanProfile } = require("../models/clan_account");
let bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");

  console.log("Test Runing")
  // History CRUD
  // Notable memebers CRUD
  // traditions CRUD
  // CLAN LINEAGE CRUD
  // Media Gallery CRUD

  // Profile CRUD

  // Create
    exports.saveClanProfile = async (req, res) => {
    // Validate the form data
    // ...
    console.log("Test Is function running"
);
    // Create a new clan profile object
    const clanProfile = new ClanProfile({
      user: req.user.id,
      clanName: req.body.clanName,
      clanMotto: req.body.clanMotto,
      email: req.body.clanEmail,
      bio: req.body.clanDescription,
      clanDescription: req.body.clanDescription,
      // leadershipHierarchy: req.body.leadershipHierarchy,
    });
  
    // Save the clan profile to the database
    await clanProfile.save();
  
    // Redirect the user to the clan profile page
    res.redirect(`/clan-profile`);
  }
// Read


  // Settings and Billing CRUD

