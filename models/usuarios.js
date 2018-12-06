let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    cuenta: { type: String },
    nombre: { nombres: { type: String }, apellidos: { type: String }},
    id_carrera: { type: String },
    desc_carrera: { type: String },
    correo:{ type: String },
    clave: { type: String},
    perfil: { type: String, enum:['Administrador','Coordinador','Estudiante'] },
}, { versionKey: false });

let Usuarios = mongoose.model('Usuarios', usuarioSchema);

module.exports = Usuarios;