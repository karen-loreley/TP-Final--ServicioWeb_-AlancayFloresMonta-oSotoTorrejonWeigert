const mongoose = require('mongoose');
const { Schema } = mongoose;
const PagoSchema = new Schema
({
    //propietario: { type: Schema.Types.ObjectId, ref: 'Propietario', required: true },
    local: { type: Schema.Types.ObjectId, ref: 'Local', required: true },
    mes: { type: Date, required: true }
})

module.exports = mongoose.models.Pago || mongoose.model('Pago', PagoSchema);