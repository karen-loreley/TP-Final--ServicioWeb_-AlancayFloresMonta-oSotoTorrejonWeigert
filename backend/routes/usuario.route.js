//defino controlador para el manejo de CRUD
const usuarioCtrl = require('./../controllers/usuario.controller');
//creamos el manejador de rutas
const express = require('express');
const router = express.Router();
//definimos las rutas para la gestion de agente
router.get('/', usuarioCtrl.getUsuarios);
router.post('/', usuarioCtrl.createUsuario);
router.get('/:id', usuarioCtrl.getUsuario);
router.put('/:id', usuarioCtrl.editUsuario);
router.delete('/:id', usuarioCtrl.deleteUsuario);
router.post('/login', usuarioCtrl.loginUsuario);
//exportamos el modulo de rutas
module.exports = router;
