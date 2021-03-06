var express = require('express');
var router = express.Router();
var repository = require('../repositories/usuariosRepository');

router.route('/')
	.get(repository.findAll)
  .post(repository.addItem);

router.route('/signup')
  .post(repository.signup)

router.route('/login')
  .post(repository.login);

router.route('/:id')
  .get(repository.findById)
  .put(repository.updateItem)
  .delete(repository.deleteItem);

module.exports = router;