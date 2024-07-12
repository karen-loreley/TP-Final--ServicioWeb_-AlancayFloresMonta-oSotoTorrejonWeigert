//defino controlador para el manejo de CRUD
const propietarioCtrl = require('./../controllers/propietario.controller');
const autCtrl = require('./../controllers/auth.controller');

//creamos el manejador de rutas
const express = require('express');
const router = express.Router();

//definimos las rutas para la gestion de agente
router.get('/', autCtrl.verifyToken,propietarioCtrl.getPropietarios);
router.post('/',autCtrl.verifyToken, propietarioCtrl.createPropietario);
router.get('/:id',autCtrl.verifyToken, propietarioCtrl.getPropietario);
router.put('/:id',autCtrl.verifyToken, propietarioCtrl.editPropietario);
router.delete('/:id',autCtrl.verifyToken, propietarioCtrl.deletePropietario)
//exportamos el modulo de rutas
module.exports = router;