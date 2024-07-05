//defino controlador para el manejo de CRUD
const local = require('../controllers/localController');
//creamos el manejador de rutas
const express = require('express');
const router = express.Router();
//definimos las rutas para la gestion de producto

router.get('/alquilados', local.getlocalesAlquilados);
router.get('/noAlquilados', local.getLocalesNoAlquilados);
router.get('/', local.getlocales);
router.post('/', local.createlocal);
router.get('/:id', local.getLocal);
router.put('/:id', local.editLocal);
router.delete('/:id', local.deleteLocal);

//exportamos el modulo de rutas
module.exports = router;