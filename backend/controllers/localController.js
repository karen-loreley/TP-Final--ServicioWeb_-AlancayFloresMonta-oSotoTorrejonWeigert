const mongoose = require('mongoose');
const Local = require('../models/local');
const localCtrl = {}

localCtrl.getlocales = async (req, res) => 
{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;

    const skip = (page - 1) * limit;

    try 
    {
        const locales = await Local.find().skip(skip).limit(limit);
        const count = await Local.countDocuments();
        
        res.status(200).json
        ({
        //array para por ejemplo: data.locales, data.totalPages, etc...
            locales,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } 
    catch (error) 
    {
        res.status(400).json
        ({
            'status': '0',
            'msg': 'Error procesando operacion.'
        });
    }
}

localCtrl.createlocal = async (req, res) => {
    var local = new Local(req.body);
    try {
        await local.save();
        res.status(200).json({
            'status': '1',
            'msg': 'Local guardado.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

localCtrl.getLocal = async (req, res) => {
    try {
        const local = await Local.findById(req.params.id);
        if (!local) {
            return res.status(404).json({
                status: '0',
                msg: 'Local no encontrado.'
            });
        }
        res.json(local);
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error al buscar el local.'
        });
    }
}

localCtrl.editLocal = async (req, res) => {
    const vlocal = new Local(req.body);
    try {
        await Local.updateOne({ _id: req.body._id }, vlocal);
        res.status(200).json({
            'status': '1',
            'msg': 'Local editado'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion editar'
        })
    }
}

localCtrl.deleteLocal = async (req, res) => {
    try {
        await Local.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'local removed'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion delete'
        });
    }
}

localCtrl.getlocalesAlquilados = async (req, res) => 
{
    try
    {
        var locales = await Local.find({ alquilado: true });
        res.json(locales);
    }
    catch (error)
    {
        res.status(400).json
        ({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

localCtrl.getLocalesNoAlquilados = async (req, res) => 
{
    try
    {
        var locales = await Local.find({ alquilado: false });
        res.json(locales);
    }
    catch (error)
    {
        res.status(400).json
        ({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
};

module.exports = localCtrl;