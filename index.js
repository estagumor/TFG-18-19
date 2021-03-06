'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3700;

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/isa', { useNewUrlParser: true })
	.then((db) => {
		console.log("Conexion a la base de datos establecida");
		// creacion del servidor
		app.listen(port, () => {
			console.log("Servidor corriendo correctamente");
		});
	}).catch(err => {
		console.log(err);   
	});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Conexion")
});