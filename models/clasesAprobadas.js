let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let cursadaSchema = new Schema({
    id_carrera: { type: Number },
    desc_carrera: { type: String },
    id_clase: { type: Number },
    desc_clase: { type: String },
    id_alumno: {type:Number}
}, { versionKey: false });

let ClasesAprobadas = mongoose.model('ClasesAprobadas', cursadaSchema);

module.exports = ClasesAprobadas;