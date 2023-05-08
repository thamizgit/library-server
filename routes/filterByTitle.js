const express = require('express');

const router = express.Router();
const bookController = require('../controllers/bookController');

router.post("/", bookController.filterByTitle);

module.exports = router;