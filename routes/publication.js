'use strict'

var express = require('express');
var PublicationController = require('../controllers/publication');

var router = express.Router();
// Declara las rutas y el metodo del controlador que las recibe
router.post('/publication', PublicationController.save);
router.get('/publications', PublicationController.getPubs);
router.post('/publication/filter', PublicationController.filterNewPubs);
router.get('/publication/project/:id', PublicationController.filterByProject)
router.post('/publication/excel', PublicationController.uploadExcel);
router.get('/publication/loadStats', PublicationController.loadStats);
router.get('/publication/congress', PublicationController.getCongressTitles);
router.get('/publication/:id', PublicationController.getPublication);
router.put('/publication/:id', PublicationController.updatePublication);
module.exports = router;
