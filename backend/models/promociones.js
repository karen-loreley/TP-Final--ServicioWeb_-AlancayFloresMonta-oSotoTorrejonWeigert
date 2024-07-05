const mongoose = require('mongoose');
const {Schema} = mongoose;
const PromocionSchema = new Schema({
 descripcion:{type:String, required:true},
 desde: {type: Date, required: true},
 hasta: {type:Date, required:true},
 local: { type: Schema.Types.ObjectId, ref: 'Local', required: true },
 imagen: {type: String, required: true}
})
module.exports = mongoose.models.Promocion || mongoose.model('Promocion', PromocionSchema);
