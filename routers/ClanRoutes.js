// Clan Routes
const express = require('express');
const router = express.Router();
const clanController = require('../controllers/clanAccount');

router.post('/clan/bio', clanController.saveClanProfile);
module.exports = router;

