//defino controlador para el manejo de CRUD
const pagoCtrl = require('../controllers/pago.controller');

//creamos el manejador de rutas
const express = require('express');
const router = express.Router();

//definimos las rutas para la gestion de agente
router.get('/', pagoCtrl.getPagos);
router.post('/', pagoCtrl.createPago);
router.get('/:id', pagoCtrl.getPago);
router.put('/:id', pagoCtrl.editPago);
router.delete('/:id', pagoCtrl.deletePago);

//exportamos el modulo de rutas
module.exports = router;