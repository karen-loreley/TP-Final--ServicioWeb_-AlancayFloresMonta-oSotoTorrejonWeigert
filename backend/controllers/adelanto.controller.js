const mongoose = require('mongoose');
const Adelanto = require('../models/adelanto');
const adelantoCtrl = {}

adelantoCtrl.getAdelantos = async (req, res) => 
{
    var pagos = await Adelanto.find().populate('pago');
    res.json(pagos);
}

adelantoCtrl.createAdelanto = async (req, res) => 
{
    var pago = new Adelanto(req.body);
    try 
    {
        await Adelanto.save();
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

adelantoCtrl.getPago = async (req, res) => 
{
    //const pago = await pago.findById(req.params.id).populate('propietario').populate('local');
    res.json(pago);
}

adelantoCtrl.editPago = async (req, res) => 
{
    const valquiler = new Adelanto(req.body);
    try 
    {
        await Adelanto.updateOne({ _id: req.body._id }, valquiler);
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

adelantoCtrl.deletePago = async (req, res) => 
{
    try 
    {
        await Adelanto.deleteOne({ _id: req.params.id });
        res.json
        ({
            status: '1',
            msg: 'Adelanto removed'
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

module.exports = adelantoCtrl;