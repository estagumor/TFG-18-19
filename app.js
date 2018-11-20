'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// archivos de rutas
var project_routes = require('./routes/project')
var investigation_routes = require('./routes/investigationProject')

// middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// CORS para el tema de permisos y lo que permite el servidor
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
})

// rutas
app.use('/api', project_routes);
app.use('/api', investigation_routes);

// exportar
module.exports = app;
