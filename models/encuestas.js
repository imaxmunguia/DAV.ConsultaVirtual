let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let encuestaSchema = new Schema({
    id_encuesta: { type: Number },
    fecha_inicio: { type: Date },
    fecha_fin: { type: Date },
    id_carrera: { type: Number },
    desc_carrera: { type: String },
    id_clase: { type: Number },
    desc_clase: { type: String },
    horario_clase: { type: String },
    catedratico_clase: { type: String },
    aceptacion: { type: Number },
    horario: { type: Number },
    dinero: { type: Number },
    campus: { type: Number },
    transporte: { type: Number },
    catedratico: { type: Number },
    otros: { type: Number },
}, { versionKey: false });

let Encuestas = mongoose.model('Encuestas', encuestaSchema);

module.exports = Encuestas;