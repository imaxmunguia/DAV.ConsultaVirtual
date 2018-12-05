var express = require('express');
var router = express.Router();
var repository = require('../repositories/votosRepository');

router.route('/')
	.get(repository.findAll)
  	.post(repository.addItem);

module.exports = router;