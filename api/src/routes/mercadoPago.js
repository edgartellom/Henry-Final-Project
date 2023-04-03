const express = require('express');
const router = express.Router();
const mercadopagoController = require('../controllers/mercadopagoController');

router.post('/create-payment', mercadopagoController.createPayment);

module.exports = router;