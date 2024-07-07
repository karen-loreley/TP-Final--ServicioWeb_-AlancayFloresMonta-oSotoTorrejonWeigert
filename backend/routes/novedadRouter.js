
const novedad = require('../controllers/novedadController');

const express = require('express');
const router = express.Router();

router.get('/estado/:estado', novedad.filtraporestado);
router.get('/', novedad.getnovedades);
router.post('/', novedad.createnovedad);
router.get('/:id', novedad.getNovedad);
router.put('/:id', novedad.editNovedad);
router.delete('/:id', novedad.deleteNovedad);

module.exports = router;
