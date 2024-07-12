const promocion = require('../controllers/promocionController');
//creamos el manejador de rutas
const express = require('express');
const router = express.Router();
//definimos las rutas para la gestion de producto

router.get('/', promocion.getpromociones);
router.post('/', promocion.createpromocion);
router.get('/:id', promocion.getpromocion);
router.put('/:id', promocion.editPromocion);
router.delete('/:id', promocion.deletePromocion);
//exportamos el modulo de rutas
module.exports = router;    