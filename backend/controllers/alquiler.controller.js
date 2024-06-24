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