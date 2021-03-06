let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let cursadaSchema = new Schema({
    id_carrera: { type: String },
    desc_carrera: { type: String },
    id_clase: { type: String },
    desc_clase: { type: String },
    id_alumno: {type:String}
}, { versionKey: false });

let ClasesAprobadas = mongoose.model('ClasesAprobadas', cursadaSchema);

module.exports = ClasesAprobadas;