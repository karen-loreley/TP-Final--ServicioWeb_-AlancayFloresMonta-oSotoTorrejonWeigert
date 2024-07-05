const Promocion = require('../models/promociones');
const local = require('../models/local')
const promocionCtrl = {}

promocionCtrl.getpromociones = async (req, res) => {
    var promocion = await Promocion.find().populate('local');
    res.status(200).json(promocion);
}

promocionCtrl.createpromocion = async (req, res) => {
    var promocion = new Promocion(req.body);
        try {
            await promocion.save();
            res.status(200).json({
            'status': '1',
            'msg': 'Promocion guardado.'})
        } catch (error) {
            res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion de crear promocion.'})
        }
}

promocionCtrl.getpromocion = async (req, res) => {
    const promocion = await Promocion.findById(req.params.id).populate('local');
    res.json(promocion);
}

promocionCtrl.editPromocion = async (req, res) => {
        try {
            await Promocion.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
            res.status(200).json({
            'status': '1',
            'msg': 'Promocion editado'
            })
        } catch (error) {
            res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion editar promocion'
            })
        }
}

promocionCtrl.deletePromocion = async (req, res)=>{
    try {
        await Promocion.deleteOne({_id: req.params.id});
        res.json({
        status: '1',
        msg: 'promocion removed'
        })
    } catch (error) {
        res.status(400).json({
        'status': '0',
        'msg': 'Error procesando la operacion delete promocion'
        });
    }
}


module.exports = promocionCtrl;