//defino controlador para el manejo de CRUD
const adelantoCtrl = require('../controllers/adelanto.controller');

//creamos el manejador de rutas
const express = require('express');
const router = express.Router();

//definimos las rutas para la gestion de agente
router.get('/', adelantoCtrl.getAdelantos);
router.post('/', adelantoCtrl.createAdelanto);
router.get('/:id', adelantoCtrl.getPago);
router.put('/:id', adelantoCtrl.editPago);
router.delete('/:id', adelantoCtrl.deletePago);

//exportamos el modulo de rutas
module.exports = router;