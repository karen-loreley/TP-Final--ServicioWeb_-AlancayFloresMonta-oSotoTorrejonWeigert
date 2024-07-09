//creamos el manejador de rutas
const pagoMercadoCtrl = require('../controllers/payment.controller');

const express = require('express');
const router = express.Router();


router.get('/create-order', pagoMercadoCtrl.createOrder)
router.get('/success', (req, res) => res.send('success'))
router.get('/webhook', (req, res) => res.send('webhook'))

module.exports = router;