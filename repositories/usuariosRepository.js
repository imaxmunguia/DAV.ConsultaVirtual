var model = require('../models/Usuarios');
var jwt= require('jsonwebtoken');
exports.findAll = function (req, res) {
    model.find(function (err, items) {
        if (err)
            res.status(500).send(err.message);
        else
            res.status(200).json(items);
        console.log('GET /usuarios')
    });
};

exports.findById = function (req, res) {
    var profile = UserRepository.getUserProfile(req)
    if(profile==null || profile!=='Administrador'){
        res.status(400).send('Permisos insuficientes');
        return;
    }
    model.findById(req.params.id, function (err, items) {
        if (err)
            res.status(500).send(err.message);
        else
            res.status(200).json(items);
        console.log('GET /usuarios/id/' + req.params.id)
    });
};

exports.login = function (req, res) {
    model.findOne({
            correo:req.body.correo,
            clave:req.body.clave,
        }, function (err, user) {
        if (err)
            res.status(500).send(err.message);
        else
            if(user==null){
                res.status(400).send('Usuario no encontrado');
                return
            }
            var token=jwt.sign({id:user._id,perfil:user.perfil},'hhh');
            res.status(200).json({
                token:token,
                perfil:user.perfil,
                nombre:user.nombre,
                apellido:user.apellido,
                id_carrera:user.id_carrera,
                desc_carrera:user.desc_carrera
            });
        console.log('GET /usuarios/id/' + req.body.correo)
    });
};

exports.signup = function (req, res){
    // model.findOne({
    //     correo:req.body.correo,
    //     clave:req.body.clave
    // };
    var newItem = new model({
        cuenta:req.body.cuenta,
        nombre:req.body.nombre,
        apellido:req.body.nombre,
        correo:req.body.correo,
        perfil: 'Estudiante'      
    });
    newItem.save().then((user)=>{
        var token=jwt.sign({id:user._id,perfil:user.perfil},'hhh');
        res.status(200).json({
            token:token,
            perfil:user.perfil,
            nombre:user.nombre,
            apellido:user.apellido,
            id_carrera:user.id_carrera,
            desc_carrera:user.desc_carrera
        });
    });
}

exports.getUserProfile = function (req){    
    var token = req.get("Authorization")
    if(typeof token==='undefined'){
        return null;
    }

    var bearer=token.split(' ');
    var userToken=jwt.decode(bearer[1],{
        key:'hhh'
    })
    if(userToken==null){
        return null;
    }
    return userToken.perfil;
};
exports.getUser = function (req) {    
    var token = req.get("Authorization")
    if(typeof token==='undefined'){
        return null;
    }

    var bearer=token.split(' ');
    var userToken=jwt.decode(bearer[1],{
        key:'hhh'
    })
    return model.findById(userToken.id);
};

exports.addItem = function (req, res) {
    console.log('POST /usuarios');
    console.log(req.body);

    var profile = UserRepository.getUserProfile(req)
    if(profile==null || profile!=='Administrador'){
        res.status(400).send('Permisos insuficientes');
        return;
    }

    var newItem = new model({
        cuenta:req.body.cuenta,
        nombre:req.body.nombre,
        id_carrera:req.body.id_carrera,
        desc_carrera:req.body.desc_carrera,
        correo:req.body.correo,
        clave:req.body.clave,
        perfil:'Coordinador'
    });

    newItem.save(function (err, item) {
        if (err)
            return res.status(500).send(err.message);
        res.status(200).json(item);
    });
};

exports.updateItem = function (req, res) {
    let user=req.body;
    model.findById(req.params.id, function (err, item) {
        item.cuenta=user.cuenta;
        item.nombre=user.nombre;
        item.id_carrera=user.id_carrera;
        item.desc_carrera=user.desc_carrera;
        item.correo=user.correo;
        item.clave=user.clave;
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