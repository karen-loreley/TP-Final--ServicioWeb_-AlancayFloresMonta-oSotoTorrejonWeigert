const mongoose = require('mongoose');
const {Schema} = mongoose;
const NovedadSchema = new Schema({

 usuario: {type: Schema.Types.ObjectId, ref: 'Usuario', required: true},
 fecha: {type: Date, required: true},
 descripcion: {type: String, required: true},
 estado: {type:String, required:true},
 
})
module.exports = mongoose.models.novedad || mongoose.model('Novedad', NovedadSchema);
