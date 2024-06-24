const Local = require('../models/local');
const localCtrl = {}

localCtrl.getlocales = async (req, res) => {
    var local = await Local.find();
    res.status(200).json(local);
}

localCtrl.createlocal = async (req, res) => {
    var local = new Local(req.body);
        try {
            await local.save();
            res.status(200).json({
            'status': '1',
            'msg': 'Local guardado.'})
        } catch (error) {
            res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'})
        }
}

localCtrl.getLocal = async (req, res) => {
    const local = await Local.findById(req.params.id);
    res.json(local);
}

localCtrl.editLocal = async (req, res) => {
    const vlocal = new Local(req.body);
        try {
            await Local.updateOne({_id: req.body._id}, vlocal);
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

localCtrl.deleteLocal = async (req, res)=>{
    try {
        await Local.deleteOne({_id: req.params.id});
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


module.exports = localCtrl;