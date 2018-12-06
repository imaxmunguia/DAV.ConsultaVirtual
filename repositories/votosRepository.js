var model = require('../models/Votos');
var UserRepository = require('./usuariosRepository');
var EncuestaRepository = require('./encuestasRepository');


exports.findAll = function (req, res) {
    if(typeof req.params.id_encuesta==='undefined' ){
        res.status(406).send('Debe proveer un ID de Encuesta');
        return;
    }
    model.find({
        id_encuesta: req.params.id_encuesta
    },function (err, items) {
        if (err)
            res.status(500).send(err.message);
        else
            res.status(200).json(items);
        console.log('GET /votos')
    })
}


exports.findByUser = async function (id_usuario) {
    console.log(id_usuario);
    votos=await model.find({
        id_alumno:id_usuario
    });
    let encuestas=[];
    for(let i=0;i<votos.length;i++){
        if (votos[i].id_encuesta.match(/^[0-9a-fA-F]{24}$/)) {
            encuestas.push(votos[i].id_encuesta);
          }
        
    }
    return encuestas;
}



exports.addItem = function (req, res) {
    var profile = UserRepository.getUserProfile(req)
    if(profile==null &&  (profile!=='Estudiante' || profile!=='Alumno')){
        res.status(400).send('Permisos insuficientes');
        return;
    }
    UserRepository.getUser(req).then((user)=>{
        let voto=req.body;
        voto.id_encuesta=req.params.id_encuesta;
        voto.id_alumno=user.id;
        let newItem = new model(voto);
        console.log(voto);
        newItem.save((err,nuevoVoto)=>{
            if(err){
                res.status(500).send({
                    result:'error al guardar',
                    message:err.message
                });
                return;
            }
            console.log(nuevoVoto);
            EncuestaRepository.findOne(voto.id_encuesta).then((encuesta)=>{
                if(encuesta==null){
                    res.status(400).send('Encuesta no encontrada'); 
                    return;
                }
                model.find({id_encuesta:encuesta.id}).then((votos)=>{
                    encuesta.dinero=calcularPromedio(votos,'dinero');
                    encuesta.transporte=calcularPromedio(votos,'transporte');
                    encuesta.horario=calcularPromedio(votos,'horario');
                    encuesta.aceptacion=calcularAceptacion(votos);
                    encuesta.campus=calcularPromedio(votos,'campus');
                    encuesta.transporte=calcularPromedio(votos,'transporte');
                    encuesta.catedratico=calcularPromedio(votos,'catedratico');
                    encuesta.otros=calcularPromedio(votos,'otros');
                    encuesta.votos=calcularVotos(votos);
                    encuesta.save((err,encuesta)=>{
                        if(err){
                            res.status(500).json({'result':err.message});        
                            return;
                        }
                        res.status(200).json({'result':'voto guardado'});    
                    });   
                })
            })
        })
    })
    

    
};

function calcularPromedio(votos,campo){
    let cantidadVotos=votos.length;
    let resultado=0;
    for(let i=0; i<votos.length ; i++ ){
        resultado+=votos[i][campo];
    }
    return resultado/cantidadVotos;
}

function calcularAceptacion(votos){
    let resultado=0;
    for(let i=0; i<votos.length ; i++ ){
        if(votos[i].aceptacion==true){
            resultado++;
        }
    }
    return resultado;
}


function calcularVotos(votos){
    return votos.length;
}