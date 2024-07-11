const mongoose = require('mongoose');
const { Schema } = mongoose;
const PropietarioSchema = new Schema
({
    apellido: { type: String, required: true },
    nombres: { type: String, required: true },
    dni: { type: String, required: true },
    email: { type: String, required: true },
    telefono: { type: Number, required: true },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true }

})

module.exports = mongoose.models.Propietario || mongoose.model('Propietario', PropietarioSchema);
