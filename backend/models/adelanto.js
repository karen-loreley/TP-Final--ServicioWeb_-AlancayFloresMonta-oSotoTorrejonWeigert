const mongoose = require('mongoose');
const { Schema } = mongoose;
const AdelantoSchema = new Schema
({
    pago: { type: Schema.Types.ObjectId, ref: 'Pago', required: true },
    monto: {type:Number, required:true},
})

module.exports = mongoose.models.Adelanto || mongoose.model('Adelanto', AdelantoSchema);