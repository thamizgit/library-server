const express = require('express');

const router = express.Router();

const bookController = require('../controllers/bookController');

router.get('/', bookController.getBooks)
    .post('/', bookController.postBooks)
    .post('/slow',bookController.slowFetch)
module.exports = router;