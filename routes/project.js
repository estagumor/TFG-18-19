'use strict'

var express = require('express');
var ProjectController = require('../controllers/project');

var router = express.Router();
// Declara las rutas y el metodo del controlador que las recibe
router.post('/project', ProjectController.saveProject);
router.get('/project/:id?', ProjectController.getProject);
router.get('/project/title/:title', ProjectController.findByTitle);
router.get('/project/reference/:reference', ProjectController.findByReference);
router.get('/projects', ProjectController.getProjects);
router.put('/project/:id', ProjectController.updateProject);
router.delete('/project/:id', ProjectController.deleteProject);

module.exports = router;
