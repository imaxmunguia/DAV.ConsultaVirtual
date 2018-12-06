var express = require('express');
var router = express.Router();
var repository = require('../repositories/votosRepository');

router.route('/:id_encuesta')
	.get(repository.findAll)
	.post(repository.addItem);

	
router.route('/')
	.get(repository.findAll)
module.exports = router;