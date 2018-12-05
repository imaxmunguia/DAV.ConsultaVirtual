var model = require('../models/Votos');
var UserRepository = require('./usuariosRepository');

exports.findAll = function (req, res) {
    if(typeof req.body.id_encuesta==='undefined' ){
        res.status(406).send('Debe proveer un ID de Encuesta');
        return;
    }
    model.findAll({
        id_encuesta: req.body.id_encuesta
    },function (err, items) {
        if (err)
            res.status(500).send(err.message);
        else
            res.status(200).json(items);
        console.log('GET /votos')
    });
};


exports.addItem = function (req, res) {
    console.log('POST /votos');
    var profile = UserRepository.getUserProfile(req)
    if(profile==null || profile!=='Coordinador'){
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

    newItem.save(function (err, item) {
        if (err)
            return res.status(500).send(err.message);
        res.status(200).jsonp(item);
    });
};

