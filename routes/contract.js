'use strict'

var express = require('express');
var ContractController = require('../controllers/contract');

var router = express.Router();
// Declara las rutas y el metodo del controlador que las recibe
router.post('/contract', ContractController.saveContract);
router.get('/contract/:id?', ContractController.getContract);
router.get('/contracts', ContractController.getContracts);
router.put('/contract/:id', ContractController.updateContract);
router.delete('/contract/:id', ContractController.deleteContract);

module.exports = router;
