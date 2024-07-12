//defino controlador para el manejo de CRUD
const pagoCtrl = require('../controllers/pago.controller');
const autCtrl = require('./../controllers/auth.controller');


//creamos el manejador de rutas
const express = require('express');
const router = express.Router();

//definimos las rutas para la gestion de agente
router.get('/', autCtrl.verifyToken,pagoCtrl.getPagos);
router.post('/',autCtrl.verifyToken, pagoCtrl.createPago);
router.get('/:id',autCtrl.verifyToken, pagoCtrl.getPago);
router.put('/:id',autCtrl.verifyToken, pagoCtrl.editPago);
router.delete('/:id',autCtrl.verifyToken, pagoCtrl.deletePago);

//exportamos el modulo de rutas
module.exports = router;