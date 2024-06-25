const Novedades = require('../models/novedades');
const novedadesCtrl = {}

novedadesCtrl.getnovedades= async (req, res) => {
    var novedades = await Novedades.find();
    res.status(200).json(novedades);
}

novedadesCtrl.createnovedad = async (req, res) => {
    var novedades = new Novedades(req.body);
        try {
            await novedades.save();
            res.status(200).json({
            'status': '1',
            'msg': 'Novedad guardada.'})
        } catch (error) {
            res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion crear novedad.'})
        }
}

novedadesCtrl.getNovedad = async (req, res) => {
    const novedad = await Novedad.findById(req.params.id);
    res.json(novedad);
}

novedadesCtrl.editNovedad = async (req, res) => {
    const vnovedad = new Novedades(req.body);
        try {
            await Novedades.updateOne({_id: req.body._id}, vnovedad);
            res.status(200).json({
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

novedadesCtrl.deleteNovedad = async (req, res)=>{
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

novedadesCtrl.filtraporestado= async(req, res)=>{
    try{
        const { estado } = req.params; 
        const novedad = await Novedades.find({ estado: estado});
        res.json(novedad);
    }
    catch{
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion de filtrar de novedad'
            });
    }
}


module.exports = novedadesCtrl;