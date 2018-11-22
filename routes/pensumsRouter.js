var express = require('express');
var router = express.Router();
var pensumsRepository = require('../repositories/pensumsRepository');

router.route('/')
	.get(pensumsRepository.findAll)
  	.post(pensumsRepository.addItem);

 router.route('/:id')
  .get(pensumsRepository.findById)
  .put(pensumsRepository.updateItem)
  .delete(pensumsRepository.deleteItem);

module.exports = router;