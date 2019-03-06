'use strict'

var express = require('express');
var InvestigationProjectController = require('../controllers/investigationProject');

var router = express.Router();
// Declara las rutas y el metodo del controlador que las recibe
router.post('/investigationProject', InvestigationProjectController.saveProject);
router.get('/investigationProject/:id?', InvestigationProjectController.getProject);
router.get('/investigationProjects', InvestigationProjectController.getProjects);
router.put('/investigationProject/:id', InvestigationProjectController.updateProject);
router.delete('/investigationProject/:id', InvestigationProjectController.deleteProject);

module.exports = router;
