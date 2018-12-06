let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let votoSchema = new Schema({
    id_encuesta: { type: String },
    id_alumno: { type: String },
    id_clase: { type: Number },
    aceptacion: { type: Boolean },
    horario: { type: Number },
    dinero: { type: Number },
    campus: { type: Number },
    transporte: { type: Number },
    catedratico: { type: Number },
    otros: { type: Number },
    observacion: { type: String }
}, { versionKey: false });

let Votos = mongoose.model('Votos', votoSchema);

module.exports = Votos;