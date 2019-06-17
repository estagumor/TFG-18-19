'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// archivos de rutas
var project_routes = require('./routes/project')
var publication_routes = require('./routes/publication')
var person_routes = require('./routes/person')
var dashboard_routes = require('./routes/dashboard')

// middlewares
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

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
app.use('/api', publication_routes);
app.use('/api', person_routes);
app.use('/api', dashboard_routes)
// Toda aquella url que no pertenezca a la api la redirige al index html donde el Router de Angular se encarga de redirigir
app.all('*', (req, res) => {  
    res.status(200).sendFile(__dirname + '/dist/index.html');  
  });  

// exportar
module.exports = app;
