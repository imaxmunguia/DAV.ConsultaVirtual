var model = require('../models/Votos');
var UserRepository = require('./usuariosRepository');
var EncuestaRepository = require('./encuestasRepository');


exports.findAll = function (req, res) {
    if(typeof req.params.id_encuesta==='undefined' ){
        res.status(406).send('Debe proveer un ID de Encuesta');
        return;
    }
    model.find({
        id_encuesta: req.body.id_encuesta
    },function (err, items) {
        if (err)
            res.status(500).send(err.message);
        else
            res.status(200).json(items);
      });
};

exports.addItem = function (req, res) {
    var profile = UserRepository.getUserProfile(req)
    console.log(profile)
    if(profile==null || profile!=='Estudiante'){
        res.status(400).send('Permisos insuficientes');
        return;
    }

    var newItem = new model({
        id_encuesta: req.body.id_encuesta,
        id_alumno: req.body.id_alumno,
        id_clase: req.body.id_clase,
        aceptacion: req.body.aceptacion,
        horario: req.body.horario,
        dinero: req.body.dinero,
        campus: req.body.campus,
        transporte: req.body.transporte,
        catedratico: req.body.catedratico,
        otros: req.body.otros,
        observacion: req.body.observacion
    });

    var encuesta=EncuestaRepository.findOne(newItem.id_encuesta);
    model.findAll({id_encuesta:encuesta.id}).then((votos)=>{
        
        encuesta.dinero=calcularPromedio(votos,'dinero');
        encuesta.transporte=calcularPromedio(votos,'transporte');
        encuesta.horario=calcularPromedio(votos,'horario');
        encuesta.aceptacion=calcularAceptacion(votos);
        encuesta.campus=calcularPromedio(votos,'campus');
        encuesta.transporte=calcularPromedio(votos,'transporte');
        encuesta.catedratico=calcularPromedio(votos,'catedratico');
        encuesta.otros=calcularPromedio(votos,'otros');
        encuesta.save();

        res.status(200).json('encuesta guardada')    
        console.log('POST /votos');    
    })
};

function calcularPromedio(votos,campo){
    let cantidadVotos=votos.length;
    let resultado=0;
    for(let i=0; i>votos.length ; i++ ){
        resultado+=votos[i][campo];
    }
    return resultado/cantidadVotos;
}

function calcularAceptacion(votos){
    let resultado=0;
    for(let i=0; i>votos.length ; i++ ){
        if(votos[i].aceptacion==true){
            resultado++;
        }
    }
    return resultado;
}