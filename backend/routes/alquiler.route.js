//defino controlador para el manejo de CRUD
const alquilerCtrl = require('./../controllers/alquiler.controller');

//creamos el manejador de rutas
const express = require('express');
const router = express.Router();

//definimos las rutas para la gestion de agente
router.get('/', alquilerCtrl.getAlquileres);
router.post('/', alquilerCtrl.createAlquiler);
router.get('/:id', alquilerCtrl.getAlquiler);
router.get('/local/:localId', alquilerCtrl.getAlquilerByLocalId);
router.put('/:id', alquilerCtrl.editAlquiler);
router.delete('/:id', alquilerCtrl.deleteAlquiler);

//exportamos el modulo de rutas
module.exports = router;