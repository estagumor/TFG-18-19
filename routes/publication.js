'use strict'

var express = require('express');
var PublicationController = require('../controllers/publication');

var router = express.Router();
// Declara las rutas y el metodo del controlador que las recibe
router.post('/publication', PublicationController.save);
router.get('/publications', PublicationController.getPubs);
router.post('/publication/all', PublicationController.saveAll);

module.exports = router;
