//defino controlador para el manejo de CRUD
const alquilerCtrl = require('./../controllers/alquiler.controller');
const autCtrl = require('./../controllers/auth.controller');

//creamos el manejador de rutas
const express = require('express');
const router = express.Router();

//definimos las rutas para la gestion de agente
router.get('/', autCtrl.verifyToken,alquilerCtrl.getAlquileres);
router.post('/', autCtrl.verifyToken,alquilerCtrl.createAlquiler);
router.get('/:id', autCtrl.verifyToken,alquilerCtrl.getAlquiler);
router.get('/local/:localId', autCtrl.verifyToken,alquilerCtrl.getAlquilerByLocalId);
router.put('/:id',autCtrl.verifyToken, alquilerCtrl.editAlquiler);
router.delete('/:id',autCtrl.verifyToken, alquilerCtrl.deleteAlquiler);

//exportamos el modulo de rutas
module.exports = router;