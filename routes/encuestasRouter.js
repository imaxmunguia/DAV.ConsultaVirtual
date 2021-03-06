var express = require('express');
var router = express.Router();
var repository = require('../repositories/encuestasRepository');

router.route('/cerradas')
	.get(repository.cerradas)

router.route('/')
	.get(repository.findAll)
    .post(repository.addItem);
    
router.route('/toggle/:id')
  	.post(repository.toggle);

 router.route('/:id')
  .get(repository.findById)
  .put(repository.updateItem)
  .delete(repository.deleteItem);

module.exports = router;