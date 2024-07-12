
const novedad = require('../controllers/novedadController');
const autCtrl = require('./../controllers/auth.controller');


const express = require('express');
const router = express.Router();

router.get('/estado/:estado', autCtrl.verifyToken,novedad.filtraporestado);
router.get('/',autCtrl.verifyToken ,novedad.getnovedades);
router.post('/',autCtrl.verifyToken, novedad.createnovedad);
router.get('/:id',autCtrl.verifyToken, novedad.getNovedad);
router.get('/local/:localId',autCtrl.verifyToken, novedad.getNovedadByLocalId);
router.put('/:id',autCtrl.verifyToken, novedad.editNovedad);
router.delete('/:id',autCtrl.verifyToken, novedad.deleteNovedad);

module.exports = router;
