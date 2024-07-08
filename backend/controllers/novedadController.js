const mongoose = require('mongoose');
const Novedad = require('../models/novedad');
const Usuario=require('../models/usuario');
const novedadCtrl = {}

novedadCtrl.getnovedades= async (req, res) => 
{
    var novedades = await Novedad.find()
    .populate
    ({
        path: 'alquiler',
        populate: 
        [
            { path: 'local' },
            { path: 'propietario' }
        ]
    });

    res.status(200).json(novedades);
}

novedadCtrl.createnovedad = async (req, res) => {
    var novedad = new Novedad(req.body);
        try {
            await novedad.save();
            res.status(200).json({
            'status': '1',
            'msg': 'Novedad guardada.'})
        } catch (error) {
            console.error("Error:", error);
            res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion crear novedad.',
            'error': error.message
            });
        }
}

novedadCtrl.getNovedad = async (req, res) => {
    const novedad = await Novedad.findById(req.params.id).populate('alquiler');
    res.json(novedad);
}

novedadCtrl.editNovedad = async (req, res) => {
    const vnovedad = new Novedad(req.body);
        try {
            await Novedad.updateOne({_id: req.body._id}, vnovedad);
            res.json({
            'status': '1',
            'msg': 'novedad editado'
            })
        } catch (error) {
            res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion editar novedad'
            })
        }
}

novedadCtrl.deleteNovedad = async (req, res)=>{
    try {
        await Novedad.deleteOne({_id: req.params.id});
        res.json({
        status: '1',
        msg: 'novedad removed'
        })
    } catch (error) {
        res.status(400).json({
        'status': '0',
        'msg': 'Error procesando la operacion delete novedad'
        });
    }
}

novedadCtrl.filtraporestado= async(req, res)=>{
    try{
        const { estado } = req.params; 
        const novedad = await Novedad.find({ estado: estado}).populate('alquiler');
        res.json(novedad);
    }
    catch{
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion de filtrar de novedad'
            });
    }
}

module.exports = novedadCtrl;