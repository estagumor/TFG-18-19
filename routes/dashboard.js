'use strict'

var express = require('express');
var DashboardController = require('../controllers/dashboard');
var FakeScopus = require('../controllers/fakeScopus');

var router = express.Router();
// Declara las rutas y el metodo del controlador que las recibe
router.get('/populate', DashboardController.populate);
router.get('/fakeScopus', FakeScopus.fakeCall)

module.exports = router;