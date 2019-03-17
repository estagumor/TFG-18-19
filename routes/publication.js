'use strict'

var express = require('express');
var PublicationController = require('../controllers/publication');

var router = express.Router();
// Declara las rutas y el metodo del controlador que las recibe
router.post('/publication', PublicationController.save);
router.get('/publications', PublicationController.getPubs);
router.post('/publication/all', PublicationController.saveAll);
router.post('/publication/filter', PublicationController.filterNewPubs);
router.get('/publication/project/:id', PublicationController.filterByProject)

module.exports = router;
