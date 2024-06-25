//defino controlador para el manejo de CRUD
const novedad = require('../controllers/novedadesController');
//creamos el manejador de rutas
const express = require('express');
const router = express.Router();
//definimos las rutas para la gestion de producto
router.get('/estado', novedad.filtraporestado);
router.get('/', novedad.getnovedades);
router.post('/', novedad.createnovedad);
router.get('/:id', novedad.getNovedad);
router.put('/:id', novedad.editNovedad);
router.delete('/:id', novedad.deleteNovedad);
//exportamos el modulo de rutas
module.exports = router;