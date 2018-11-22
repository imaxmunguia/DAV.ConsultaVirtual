var express = require('express');
var router = express.Router();
var repository = require('../repositories/encuestasRepository');

router.route('/')
	.get(repository.findAll)
  	.post(repository.addItem);

 router.route('/:id')
  .get(repository.findById)
  .put(repository.updateItem)
  .delete(repository.deleteItem);

module.exports = router;