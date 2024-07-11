const mongoose = require('mongoose');
const Pago = require('../models/pago');
const pagoCtrl = {}

pagoCtrl.getPagos = async (req, res) => 
{
    var pagos = await Pago.find().populate('local');
    res.json(pagos);
}

pagoCtrl.createPago = async (req, res) => 
{
    var pago = new Pago(req.body);
    try 
    {
        await pago.save();
        res.json
        ({
            'status': '1',
            'msg': 'pago guardado.'
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

pagoCtrl.getPago = async (req, res) => 
{
    //const pago = await pago.findById(req.params.id).populate('propietario').populate('local');
    //res.json(pago);
}

pagoCtrl.editPago = async (req, res) => 
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

pagoCtrl.deletePago = async (req, res) => 
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
//este filtro en proceso 

module.exports = pagoCtrl;