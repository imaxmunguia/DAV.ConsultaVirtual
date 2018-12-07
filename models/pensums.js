let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let pensumSchema = new Schema({
    id_carrera: { type: String },
    nombre: { type: String },
    desc_carrera: { type: String },
    desc_clase: { type: String },
    id_requisito: { type: [String] }
}, { versionKey: false });

let Pensums = mongoose.model('Pensums', pensumSchema);

module.exports = Pensums;