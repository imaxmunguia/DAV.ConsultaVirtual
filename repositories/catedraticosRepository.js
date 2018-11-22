var model = require('../models/Catedraticos');

exports.findAll = function (req, res) {
    model.find(function (err, items) {
        if (err)
            res.status(500).send(err.message);
        else
            res.status(200).json(items);
        console.log('GET /catedraticos')
    });
};

exports.findById = function (req, res) {
    model.findById(req.params.id, function (err, items) {
        if (err)
            res.status(500).send(err.message);
        else
            res.status(200).json(items);
        console.log('GET /catedraticos/id/' + req.params.id)
    });
};

exports.addItem = function (req, res) {
    console.log('POST /catedraticos');
    console.log(req.body);

    var newItem = new model({
        id_catedratico: req.body.id_catedratico,
        nombre: req.body.nombre       
    });

    newItem.save(function (err, item) {
        if (err)
            return res.status(500).send(err.message);
        res.status(200).jsonp(item);
    });
};

exports.updateItem = function (req, res) {
    model.findById(req.params.id, function (err, item) {
        item.id_catedratico = req.body.id_carrera;
        item.nombre = req.body.nombre
        
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