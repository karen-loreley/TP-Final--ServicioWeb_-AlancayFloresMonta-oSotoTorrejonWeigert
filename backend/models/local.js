const mongoose = require('mongoose');
const {Schema} = mongoose;
const LocalSchema = new Schema
({
    propietario: { type: Schema.Types.ObjectId, ref: 'Propietario', required: true },
    nombre:{type:String, required:true},
    superficie:{type:Number, required:true},
    habilitado: {type: Boolean, required: true},
    costomes: {type:Number, required:true},
    pathimagen: {type:String, required:true},
    alquilado: {type: Boolean, required: true}
})
module.exports = mongoose.models.local || mongoose.model('Local', LocalSchema);
//