var model = require('../models/ClasesAprobadas');
var UserRepository = require('./usuariosRepository');

exports.findAll = function (req, res) {
    model.find(function (err, items) {
        if (err)
            res.status(500).send(err.message);
        else
            res.status(200).json(items);
        console.log('GET /clasesAprobadas')
    });
};


exports.find = function(id_carrera, id_alumno,id_clase){
	return model.findOne({
        id_carrera:id_carrera,
        id_alumno:id_alumno,
        id_clase:id_clase
    });
};


exports.toggle = function(req,res){
    var profile = UserRepository.getUserProfile(req)
    if(profile==null &&  (profile!=='Estudiante' || profile!=='Alumno')){
        res.status(400).send('Permisos insuficientes');
        return;
    }
	UserRepository.getUser(req).then((user)=>{
        model.findOne({
            id_carrera:user.id_carrera,
            id_alumno:user._id
        }).then((claseCursada)=>{
            if(claseCursada==null){
                let nuevaClaseCursada=new model({
                    id_carrera:user.id_carrera,
                    id_clase:req.params.id_clase,
                    id_alumno:user._id,
                });
                nuevaClaseCursada.save().then((clase)=>{
                    res.status(200).json({
                        'resultado':'Clase aprobada'
                    })
                });
            }else{
                claseCursada.delete().then(()=>{
                    res.status(200).json({
                        'resultado':'Clase cursada eliminada'
                    })
                })
            }
        })
    });
	
};

exports.findById = function (req, res) {
    model.findById(req.params.id, function (err, items) {
        if (err)
            res.status(500).send(err.message);
        else
            res.status(200).json(items);
        console.log('GET /clasesAprobadas/id/' + req.params.id)
    });
};

exports.findByUser = async function (id_carrera,id_alumno) {
    let clasesAprobadas=await model.find({
        id_carrera:id_carrera,
        id_alumno:id_alumno
    });
    return clasesAprobadas;
};

exports.addItem = function (req, res) {
    console.log('POST /clasesAprobadas');
    console.log(req.body);

    var newItem = new model({
        id_carrera: req.body.id_carrera,
        desc_carrera: req.body.desc_carrera,
        id_clase: req.body.id_clase,
        desc_clase: req.body.desc_clase,
        id_alumno: req.body.id_alumno        
    });

    newItem.save(function (err, item) {
        if (err)
            return res.status(500).send(err.message);
        res.status(200).jsonp(item);
    });
};

exports.updateItem = function (req, res) {
    model.findById(req.params.id, function (err, item) {
        item.id_carrera = req.body.id_carrera;
        item.desc_carrera = req.body.desc_carrera;
        item.id_clase = req.body.id_clase;
        item.desc_clase = req.body.desc_clase;
        item.id_alumno = req.body.id_alumno;
        
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