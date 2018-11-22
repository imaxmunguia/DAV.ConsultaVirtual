var model = require('../models/Usuarios');

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
    model.findById(req.params.id, function (err, items) {
        if (err)
            res.status(500).send(err.message);
        else
            res.status(200).json(items);
        console.log('GET /usuarios/id/' + req.params.id)
    });
};

exports.addItem = function (req, res) {
    console.log('POST /usuarios');
    console.log(req.body);

    var newItem = new model({
        cuenta:req.body.cuenta,
        nombre:req.body.nombre,
        id_carrera:req.body.id_carrera,
        desc_carrera:req.body.desc_carrera,
        correo:req.body.correo,
        clave:req.body.clave,
        perfil:req.body.perfil
    });

    newItem.save(function (err, item) {
        if (err)
            return res.status(500).send(err.message);
        res.status(200).jsonp(item);
    });
};

exports.updateItem = function (req, res) {
    model.findById(req.params.id, function (err, item) {
        item.cuenta=req.body.cuenta;
        item.nombre=req.body.nombre;
        item.id_carrera=req.body.id_carrera;
        item.desc_carrera=req.body.desc_carrera;
        item.correo=req.body.correo;
        item.clave=req.body.clave;
        item.perfil=req.body.perfil;

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