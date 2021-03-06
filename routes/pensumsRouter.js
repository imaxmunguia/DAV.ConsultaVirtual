var express = require('express');
var router = express.Router();
var pensumsRepository = require('../repositories/pensumsRepository');


router.route('/clases')
.get(pensumsRepository.clases)

router.route('/cursadas')
.get(pensumsRepository.cursadas)

router.route('/')
	.get(pensumsRepository.findAll)
  	.post(pensumsRepository.addItem);

router.route('/lista')
.get(pensumsRepository.lista)

 router.route('/:id')
  .get(pensumsRepository.findById)
  .put(pensumsRepository.updateItem)
  .delete(pensumsRepository.deleteItem);

  
module.exports = router;