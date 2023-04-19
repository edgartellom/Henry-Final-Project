const express = require('express');
const router = express.Router();
const { addToCart } = require('../controllers/userCartController');

router.post('/:userId/cart', addToCart);

module.exports = router;