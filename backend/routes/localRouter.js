//defino controlador para el manejo de CRUD
const local = require('../controllers/localController');
const autCtrl = require('./../controllers/auth.controller');

//creamos el manejador de rutas
const express = require('express');
const router = express.Router();
//definimos las rutas para la gestion de producto

router.get('/alquilados', autCtrl.verifyToken, local.getlocalesAlquilados);
router.get('/noAlquilados', autCtrl.verifyToken,local.getLocalesNoAlquilados);
router.get('/', local.getlocales);
router.post('/',autCtrl.verifyToken, local.createlocal);
router.get('/:id',autCtrl.verifyToken, local.getLocal);
router.put('/:id',autCtrl.verifyToken, local.editLocal);
router.delete('/:id',autCtrl.verifyToken, local.deleteLocal);

//exportamos el modulo de rutas
module.exports = router;