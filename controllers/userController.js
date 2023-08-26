const User = require("../models/User");
let bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");

exports.registerUser = async (req, res) => {
  console.log(
    JSON.stringify({
      method: req.method, 
      path: req.path
    }),
    JSON.stringify(req.body)
  );
  // Validate the user input
  await check("username", "Username is required").notEmpty().run(req);
  await check("password", "Password is required").notEmpty().run(req);
  await check("role", "Role is required")
    .notEmpty()
    .isIn(["user", "clan", "admin"])
    .run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Check if there is already a user with the same username or email
  const { email, username, password, role } = req.body;
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });

  if (existingUser) {
    if (existingUser.username === username) {
      return res.status(409).json({ message: "Username is already taken" });
    } else {
      return res.status(409).json({ message: "Email is already taken" });
    }
  }

  // Create a new user
  try {
    const user = await User.create({ email, username, password, role });
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Something went wrong" });
  }
};

