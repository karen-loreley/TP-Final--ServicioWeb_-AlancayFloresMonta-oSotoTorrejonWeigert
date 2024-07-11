const mongoose = require('mongoose');
const { Schema } = mongoose;
const AlquilerSchema = new Schema
({
    //propietario: { type: Schema.Types.ObjectId, ref: 'Propietario', required: true },
    local: { type: Schema.Types.ObjectId, ref: 'Local', required: true },
    //novedades: { type: Schema.Types.ObjectId, ref: 'Novedad', required: true },
    plazomes: { type: Number, required: true },
    //costoAlquiler: { type: Number, required: true },
    fechaAlquiler: { type: Date, required: true }
})

module.exports = mongoose.models.Alquiler || mongoose.model('Alquiler', AlquilerSchema);