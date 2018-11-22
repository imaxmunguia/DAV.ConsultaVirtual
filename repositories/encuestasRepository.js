var model = require('../models/Encuestas');

exports.findAll = function (req, res) {
    model.find(function (err, items) {
        if (err)
            res.status(500).send(err.message);
        else
            res.status(200).json(items);
        console.log('GET /encuestas')
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

exports.addItem = function (req, res) {
    console.log('POST /encuestas');
    console.log(req.body);

    var newItem = new model({
        id_encuesta: req.body.id_encuesta,
        fecha_inicio: req.body.fecha_inicio,
        fecha_fin: req.body.fecha_fin,
        id_alumno: req.body.id_alumno,
        id_carrera: req.body.id_carrera,
        desc_carrera: req.body.desc_carrera,
        id_clase: req.body.id_clase,
        desc_clase: req.body.desc_clase,
        horario_clase: req.body.horario_clase,
        catedratico_clase: req.body.catedratico_clase,
        aceptacion: req.body.aceptacion,
        horario: req.body.horario,
        dinero: req.body.dinero,
        campus: req.body.campus,
        transporte: req.body.transporte,
        catedratico: req.body.catedratico,
        otros: req.body.otros,
        observacion: req.body.observacion
    });

    newItem.save(function (err, item) {
        if (err)
            return res.status(500).send(err.message);
        res.status(200).jsonp(item);
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