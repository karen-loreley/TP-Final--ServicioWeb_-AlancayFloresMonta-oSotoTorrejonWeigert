const mongoose = require('mongoose');
const { Schema } = mongoose;
const PagoMercadoSchema = new Schema
({
    //propietario: { type: Schema.Types.ObjectId, ref: 'Propietario', required: true },
    pago: { type: Schema.Types.ObjectId, ref: 'Pago', required: true },
    
})

module.exports = mongoose.models.PagoMercado || mongoose.model('PagoMercado', PagoMercadoSchema);