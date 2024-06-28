const Usuario = require('../models/usuario');
const usuarioCtrl = {}
usuarioCtrl.getUsuarios = async (req, res) => {
    var usuarios = await Usuario.find();
    res.json(usuarios);
}
usuarioCtrl.createUsuario = async (req, res) => {
    var usuario = new Usuario(req.body);
    try {
        await usuario.save();
        res.json({
            'status': '1',
            'msg': 'Usuario guardado.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}
usuarioCtrl.getUsuario = async (req, res) => {
    const usuario = await Usuario.findById(req.params.id);
    res.json(usuario);
}
usuarioCtrl.editUsuario = async (req, res) => {
    const vusuario = new Usuario(req.body);
    try {
        await Usuario.updateOne({ _id: req.body._id }, vusuario);
        res.json({
            'status': '1',
            'msg': 'Usuario updated'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}
usuarioCtrl.deleteUsuario = async (req, res) => {
    try {
        await Usuario.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Usuario removed'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

usuarioCtrl.loginUsuario = async (req, res) => {
    //en req.body se espera que vengan las credenciales de login
    //defino los criterios de busqueda en base al username y password recibidos
    const criteria = {
        usuario: req.body.usuario,
        password: req.body.password
    }
    try {
        //el método findOne retorna un objeto que cumpla con los criterios de busqueda
        const user = await Usuario.findOne(criteria);
        if (!user) {
            res.json({
                status: 0,
                msg: "not found"
            })
        } else {
            res.json({
                status: 1,
                msg: "success",
                usuario: user.usuario, //retorno información útil para el frontend
                perfil: user.perfil, //retorno información útil para el frontend

                userid: user._id //retorno información útil para el frontend
            })
        }
    } catch (error) {
        res.json({
            status: 0,
            msg: 'error'
        })
    }
}
    module.exports = usuarioCtrl;