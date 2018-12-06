var express = require('express');
var router = express.Router();
var repository = require('../repositories/votosRepository');

router.route('/:id_encuesta')
	.get(repository.findAll);	
router.route('/')
	.post(repository.addItem);

module.exports = router;