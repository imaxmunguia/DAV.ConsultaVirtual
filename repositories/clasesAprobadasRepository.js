var model = require('../models/ClasesAprobadas');

exports.findAll = function (req, res) {
    model.find(function (err, items) {
        if (err)
            res.status(500).send(err.message);
        else
            res.status(200).json(items);
        console.log('GET /clasesAprobadas')
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