var model = require('../models/Encuestas');
var UserRepository = require('./usuariosRepository');
var PensumsRepository = require('./pensumsRepository');

exports.findAll =  function (req, res) {
    let perfil=UserRepository.getUserProfile(req);
    if(perfil==null || perfil=='Administrador'){
        res.status(401).json({
            message:'permisos insuficientes'
        })
        return;
    }
    let filters={};
    UserRepository.getUser(req).then( async (user)=>{
        if(perfil==='Coordinador'){
            filters={
                activa:true,
                id_catedratico:user.id
            }
        }else if(perfil==='Alumno' || perfil==='Estudiante'){
            //encuestas abiertas, no vencidads, clases sin requisitos pendientes
            let clases=await PensumsRepository.findSinDependencias(user.id_carrera,user._id);
            filters={
                activa:true,
                fecha_inicio: {"$lt": new Date() },
                fecha_fin: {"$gte": new Date() },
                id_carrera:user.id_carrera,
                id_clase: { "$in" : clases }
            }
        }
        model.find(filters,function (err, items) {
            if (err)
                res.status(500).send(err.message);
            else
                res.status(200).json(items);
            console.log('GET /encuestas')
        });
    });
    
};

exports.cerradas = function (req, res) {
    let perfil=UserRepository.getUserProfile(req);
    if(perfil==null || perfil=='Administrador' || perfil=='Alumno' || perfil=='Estudiante'){
        res.status(401).json({
            message:'permisos insuficientes'
        })
        return;
    }
    UserRepository.getUser(req).then( async (user)=>{
        model.find({
            activa:false,
            id_catedratico:user.id
        }, function (err, items) {
            if (err)
                res.status(500).send(err.message);
            else
                res.status(200).json(items);
        });
    });
    
};

exports.findById = function (req, res) {
    model.findById(req.params.id, function (err, items) {
        if (err)
            res.status(500).send(err.message);
        else
            res.status(200).json(items);
        console.log('GET /encuestas/id/' + req.params.id)
    });
};

exports.findOne = function (id) {
    console.log(id);
    return model.findById(id, function (err, encuesta) {
        if (err){
            return null;
        }
        else
            return encuesta;
    });
};

exports.addItem = function (req, res) {
    console.log('POST /encuestas');
    var profile = UserRepository.getUserProfile(req);

    if(profile!=='Coordinador'){
        res.status(400).send('Permisos insuficientes');
        return;
    }
    let encuesta=req.body;
    UserRepository.getUser(req).then((user)=>{
        encuesta.id_catedratico=user._id;
        encuesta.activa=true;
        var newItem = new model(encuesta);
        newItem.save(function (err, item) {
            if (err)
                return res.status(500).send(err.message);
            res.status(200).jsonp(item);
        });
    });
    
};

exports.updateItem = function (req, res) {
    model.findById(req.params.id, function (err, item) {
        item.id_encuesta = req.body.id_encuesta;
        item.fecha_inicio = req.body.fecha_inicio;
        item.fecha_fin = req.body.fecha_fin;
        item.id_alumno = req.body.id_alumno;
        item.id_carrera = req.body.id_carrera;
        item.desc_carrera = req.body.desc_carrera;
        item.id_clase = req.body.id_clase;
        item.desc_clase = req.body.desc_clase;
        item.horario_clase = req.body.horario_clase;
        item.catedratico_clase = req.body.catedratico_clase;
        item.aceptacion = req.body.aceptacion;
        item.horario = req.body.horario;
        item.dinero = req.body.dinero;
        item.campus = req.body.campus;
        item.transporte = req.body.transporte;
        item.catedratico = req.body.catedratico;
        item.otros = req.body.otros;
        item.observacion = req.body.observacion;

        item.save(function (err) {
            if (err)
                return res.status(500).send(err.message);
            res.status(200).jsonp(item);
        });
    });
};


exports.deleteItem = function (req, res) {
    model.findById(req.params.id, function (err, item) {
        item.remove(function (err) {
            if (err)
                return res.status(500).send(err.message);
            res.status(200).send();
        });
    });
};