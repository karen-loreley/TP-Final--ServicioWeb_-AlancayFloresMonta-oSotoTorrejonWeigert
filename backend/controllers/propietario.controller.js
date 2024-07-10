const Propietario = require('../models/propietario');
const Usuario = require('../models/usuario');

const propietarioCtrl = {};

// Obtener todos los propietarios con información de usuario poblada
propietarioCtrl.getPropietarios = async (req, res) => {
  try {
    const propietarios = await Propietario.find().populate('usuario'); 
    res.json(propietarios);
  } catch (error) {
    res.status(400).json({ status: '0', msg: 'Error al obtener propietarios.' });
  }
};

// Crear un nuevo propietario
propietarioCtrl.createPropietario = async (req, res) => {
  try {
    const { usuarioId, apellido, nombres, dni, email, telefono } = req.body;

    // Verificar si el usuario existe
    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
      return res.status(404).json({ status: '0', msg: 'Usuario no encontrado.' });
    }

    // Crear el nuevo propietario
    const propietario = new Propietario({
      apellido,
      nombres,
      dni,
      email,
      telefono,
      usuario: usuarioId
    });

    await propietario.save();
    res.json({ status: '1', msg: 'Propietario creado con éxito.' });
  } catch (error) {
    res.status(400).json({ status: '0', msg: 'Error al crear propietario.' });
  }
};

// Obtener un propietario por su ID
propietarioCtrl.getPropietario = async (req, res) => {
  try {
    const propietario = await Propietario.findById(req.params.id).populate('usuario');
    if (!propietario) {
      return res.status(404).json({ status: '0', msg: 'Propietario no encontrado.' });
    }
    res.json(propietario);
  } catch (error) {
    res.status(400).json({ status: '0', msg: 'Error al obtener propietario.' });
  }
};

// Actualizar un propietario
propietarioCtrl.updatePropietario = async (req, res) => {
  try {
    const { id } = req.params;
    const { usuarioId, apellido, nombres, dni, email, telefono } = req.body;
    const propietario = await Propietario.findById(id);  // Verificar si el propietario existe
    if (!propietario) {
      return res.status(404).json({ status: '0', msg: 'Propietario no encontrado.' });
    }
    const usuario = await Usuario.findById(usuarioId);// Verificar si el usuario existe
    if (!usuario) {
      return res.status(404).json({ status: '0', msg: 'Usuario no encontrado.' });
    }
    propietario.apellido = apellido || propietario.apellido;
    propietario.nombres = nombres || propietario.nombres;
    propietario.dni = dni || propietario.dni;
    propietario.email = email || propietario.email;
    propietario.telefono = telefono || propietario.telefono;
    propietario.usuario = usuarioId || propietario.usuario;
    await propietario.save();
    res.json({ status: '1', msg: 'Propietario actualizado con éxito.' });
  } catch (error) {
    res.status(400).json({ status: '0', msg: 'Error al actualizar propietario.' });
  }
};

// Eliminar un propietario
propietarioCtrl.deletePropietario = async (req, res) => {
  try {
    const { id } = req.params;
    const propietario = await Propietario.findById(id);
    if (!propietario) {
      return res.status(404).json({ status: '0', msg: 'Propietario no encontrado.' });
    }

    await Propietario.deleteOne({ _id: id });
    res.json({ status: '1', msg: 'Propietario eliminado con éxito.' });
  } catch (error) {
    res.status(400).json({ status: '0', msg: 'Error al eliminar propietario.' });
  }
};

// Obtener propietario por el ID del usuario
propietarioCtrl.getPropietarioByUsuarioId = async (req, res) => {
  try {
    const propietario = await Propietario.findOne({ usuario: req.params.usuarioId }).populate('usuario');
    if (!propietario) {
      return res.status(404).json({ status: '0', msg: 'Propietario no encontrado.' });
    }
    res.json(propietario);
  } catch (error) {
    res.status(400).json({ status: '0', msg: 'Error al obtener propietario.' });
  }
};


module.exports = propietarioCtrl;
