const mongoose = require('mongoose');
const Local = require('../models/local');
const Novedad = require('../models/novedad');
const localCtrl = {}

localCtrl.getlocales = async (req, res) => 
{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;

    const skip = (page - 1) * limit;

    try 
    {
        const locales = await Local.find().skip(skip).limit(limit).populate('propietario');
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
        const local = await Local.findById(req.params.id).populate('propietario');
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

/*localCtrl.deleteLocal = async (req, res) => {

    const localId = req.params.id;
    try {
        const local = await Local.findById(localId);
        const alquiler = await Alquiler.findOne({ localId });

        // Eliminar los alquileres asociados al local
        await Alquiler.deleteOne({ alquiler });

        // Eliminar el local
        await Local.deleteOne(localId);
        res.json({
            status: '1',
            msg: 'Local eliminado'
        });
    } catch (error) {
        console.error('Error eliminando local:', error);
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operación delete'
        });
    }
}*/

//Eliminar Local y respectiva Novedad
localCtrl.deleteLocal = async (req, res) => {
    try {
        // Encuentra el alquiler asociado al local
        const novedad = await Novedad.findOne({ local: req.params.id });
        if (novedad) {
            // Elimina el novedad si existe
            await Novedad.deleteOne({ _id: novedad._id });
        }
        // Elimina el local
        await Local.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Local y Novedad relacionados eliminados'
        });
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
        var locales = await Local.find({ alquilado: true }).populate('propietario');
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
        var locales = await Local.find({ alquilado: false }).populate('propietario');
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