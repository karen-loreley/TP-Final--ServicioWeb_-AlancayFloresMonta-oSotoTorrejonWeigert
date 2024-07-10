const mongoose = require('mongoose');
const Alquiler = require('../models/alquiler');
const alquilerCtrl = {}

alquilerCtrl.getAlquileres = async (req, res) => 
{
    var alquileres = await Alquiler.find().populate('propietario').populate('local');
    res.json(alquileres);
}

alquilerCtrl.createAlquiler = async (req, res) => 
{
    var alquiler = new Alquiler(req.body);
    try 
    {
        await alquiler.save();
        res.json
        ({
            'status': '1',
            'msg': 'Alquiler guardado.'
        })

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

alquilerCtrl.getAlquiler = async (req, res) => 
{
    const alquiler = await Alquiler.findById(req.params.id).populate('propietario').populate('local');
    res.json(alquiler);
}

alquilerCtrl.getAlquilerByLocalId = async (req, res) => 
{
    try 
    {
        const alquiler = await Alquiler.findOne({ local: req.params.localId }).populate('propietario').populate('local');
        /*if (!alquiler) 
        {
            return res.status(404).json({ status: '0', msg: 'No se encontró el alquiler para este local' });
        }*/
            res.json(alquiler);
    } 
    catch (error) 
    {
        res.status(400).json({ status: '0', msg: 'Error procesando operación' });
    }
}

alquilerCtrl.editAlquiler = async (req, res) => 
{
    const valquiler = new Alquiler(req.body);
    try 
    {
        await Alquiler.updateOne({ _id: req.body._id }, valquiler);
        res.json
        ({
            'status': '1',
            'msg': 'Alquiler updated'
        })

    } 
    catch (error) 
    {
        res.status(400).json
        ({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

alquilerCtrl.deleteAlquiler = async (req, res) => 
{
    try 
    {
        await Alquiler.deleteOne({ _id: req.params.id });
        res.json
        ({
            status: '1',
            msg: 'Alquiler removed'
        })

    } 
    catch (error) 
    {
        res.status(400).json
        ({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

alquilerCtrl.deleteAlquilerPorLocalId = async (req, res) => 
{
    const alquiler = await Alquiler.findOne({ local: req.params.localId });
    const localId = req.params.localId;
    try 
    {
        const result = await Alquiler.deleteOne({ alquiler });
        res.json
        ({
            status: '1',
            msg: 'Alquiler(es) asociado(s) eliminado(s)'
        });
    } 
    catch (error) 
    {
        console.error('Error eliminando alquiler(es) asociado(s):', error);
        res.status(400).json
        ({
            'status': '0',
            'msg': 'Error procesando la operación delete'
        });
    }
}

//este filtro en proceso 
alquilerCtrl.getAlquileresPorAño = async (req, res) => 
    {
        try 
        {
            const alquileres = await Alquiler.find({ fechaAlquiler: req.params.fechaAlquiler }).populate('espectador');
            res.json(alquileres);
        } 
        catch (error) 
        {
            res.status(400).json
            ({ 
                status: '0', 
                msg: 'Error procesando operación.' 
            });
        }
    }

module.exports = alquilerCtrl;