const mongoose = require('mongoose');
const Usuario = require('../models/usuario');

const usuarioCtrl = {}
const jwt = require('jsonwebtoken');

usuarioCtrl.getUsuarios = async (req, res) => {
    var usuarios = await Usuario.find();
    res.json(usuarios);
}

usuarioCtrl.createUsuarios = async (req, res) => {
    var usuario = new Usuario(req.body);
    try {
        await usuario.save();
        console.log("Enviando usuario:", usuario); // Para depuración
        res.status(200).json({
            status: '1',
            msg: 'Usuario creado exitosamente.'
        });
    } catch (error) {
        console.error('Error al crear usuario:', error);
    }
};

usuarioCtrl.getUsuario = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send('Invalid ID');
        }

        const usuario = await Usuario.findById(userId);
        if (!usuario) {
            return res.status(404).send('User not found');
        }

        res.json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
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
            const unToken = jwt.sign({id: user._id}, "secretkey");
            res.json({
                status: 1,
                msg: "success",
                usuario: user.usuario, 
                perfil: user.perfil, 
                token:unToken,
                userid: user._id.toString()//retorno información útil para el frontend
            })
        }
    } catch (error) {
        res.json({
            status: 0,
            msg: 'error'
        })
    }
}


usuarioCtrl.getNombreUsuarioOPerfil = async (req, res) => {
    try {
        const searchTerm = req.params.parametro;
        const usuariosNombre = await Usuario.find({ 
            $or: [
           {usuario: new RegExp('^' + searchTerm, 'i')},
           {perfil: new RegExp('^' + searchTerm, 'i')}
            ]
        });
        res.json(usuariosNombre);
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar usuarios' });
    }
}

module.exports = usuarioCtrl;