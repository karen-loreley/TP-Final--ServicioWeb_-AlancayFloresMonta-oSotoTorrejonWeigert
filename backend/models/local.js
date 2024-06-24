const mongoose = require('mongoose');
const {Schema} = mongoose;
const ProductoSchema = new Schema({
 superficie:{type:Number, required:true},
 habilitado: {type: Boolean, required: true},
 costomes: {type:Number, required:true},
 pathimagen: {type:String, required:true},
 alquilado: {type: Boolean, required: true}
})
module.exports = mongoose.models.punto1 || mongoose.model('Producto', ProductoSchema);
