'use strict'

var express = require('express');
var Personcontroller = require('../controllers/person');

var router = express.Router();
// Declara las rutas y el metodo del controlador que las recibe
router.post('/person', Personcontroller.savePerson);
router.get('/person/:id?', Personcontroller.getPerson);
router.get('/persons', Personcontroller.getPersons);
router.put('/person/:id', Personcontroller.updatePerson);
router.delete('/person/:id', Personcontroller.deletePerson);

module.exports = router;
