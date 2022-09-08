const express = require("express");
const router = express.Router();
const {createPayment , getAllPayment} = require('../controllers/paymentController')

router.post('/create-payment'  , createPayment)

router.get('/get-all-payment'  , getAllPayment)

module.exports = router;