'use strict'

var express = require('express');
var NetController = require('../controllers/net');

var router = express.Router();
// Declara las rutas y el metodo del controlador que las recibe
router.post('/net', NetController.saveProject);
router.get('/net/:id?', NetController.getProject);
router.get('/nets', NetController.getProjects);
router.put('/net/:id', NetController.updateProject);
router.delete('/net/:id', NetController.deleteProject);

module.exports = router;
