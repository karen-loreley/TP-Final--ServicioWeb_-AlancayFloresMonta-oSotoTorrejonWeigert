const promocion = require('../controllers/promocionController');
const autCtrl = require('../controllers/auth.controller');

//creamos el manejador de rutas
const express = require('express');
const router = express.Router();
//definimos las rutas para la gestion de producto

router.get('/',autCtrl.verifyToken, promocion.getpromociones);
router.post('/',autCtrl.verifyToken, promocion.createpromocion);
router.get('/:id',autCtrl.verifyToken, promocion.getpromocion);
router.put('/:id',autCtrl.verifyToken, promocion.editPromocion);
router.delete('/:id',autCtrl.verifyToken, promocion.deletePromocion);
//exportamos el modulo de rutas
module.exports = router;    