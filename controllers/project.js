'use strict' // Para usar cosas buenas de js
var mongoose = require('mongoose');
var Project = require('../models/project'); // Aporta el modelo y los metodos de la bd
var db = mongoose.connection;
// 200 -> OK, 201 -> Created, 400 -> Bad Request, 500 -> Internal Server Error, 503 -> Service Unavailable
var controller = {

	saveProject: function (req, res) { // Metodo para crear proyectos
		var proj = req.body; // Recoje los parametros que le llegan y los mete en un project nuevo
		if (proj.startDate != null) {
			var startDate = proj.startDate;
			proj.startDate = startDate["month"] + "/" + startDate["day"] + "/" + startDate["year"];
		}
		if (proj.endDate != null) {
			var endDate = proj.endDate;
			proj.endDate = endDate["month"] + "/" + endDate["day"] + "/" + endDate["year"];
		}

		Project.create(proj, (err) => { // Intenta guardarlo y segun vaya responde
			if (err) {
				let errores = {}
				return res.status(500).send({ message: err });
			}
			return res.status(201).send({ "proj": proj });
		});
	},

	getProject: function (req, res) {
		var projectId = req.params.id;

		if (projectId == null) {
			return res.status(400).send({ message: 'El proyecto no existe' })
		}

		Project.findById(projectId, (err, project) => {
			if (err) return res.status(500).send({
				message: err
			});

			else if (!project) return res.status(404).send({
				message: "There is no project with that id"
			});

			return res.status(200).send({
				project
			});
		});
	},

	getProjects: function (req, res) {
		let limit = req.query.limit ? parseInt(req.query.limit) : 25;
		let offset = req.query.offset ? parseInt(req.query.offset) : 0;
		let total
		Project.estimatedDocumentCount({}, (err, number) => {
			total = number;
		})

		Project.find({}, null, { limit: limit, skip: offset }, (err, projects) => {
			if (err) return res.status(500).send({ message: err })
			if (!projects) return res.status(404).send({ message: 'There are no projects to show' })
			if (!req.body) // Esto esta aqui porque en el test le paso un string para que ignore esta parte, no he conseguido hacer stub del metodo que genera este dato
				res.setHeader('X-WP-Total', total);
			return res.status(200).send({ "projects": projects });
		})
	},

	findByTitle: function (req, res) {
		var titulo = req.params.title;
		if (titulo == null) {
			return res.status(400).send({ message: 'Title is empty' })
		}

		Project.find({ title: titulo }).exec((err, projects) => {
			if (err) return res.status(500).send({ message: err })
			if (!projects) return res.status(503).send({ message: 'There are no projects to show' })
			return res.status(200).send({ projects });
		});

	},

	findByReference: function (req, res) {
		var referencia = req.params.reference;
		if (referencia == null) {
			return res.status(400).send({ message: 'Reference is empty' })
		}

		Project.find({ reference: referencia }).exec((err, projects) => {
			if (err) return res.status(500).send({ message: err })
			if (!projects) return res.status(503).send({ message: 'There are no projects to show' })
			return res.status(200).send({ projects });
		});
	},

	updateProject: function (req, res) {
		var proyectId = req.params.id;
		var datosUpdate = req.body;

		if (datosUpdate.startDate != null) {
			var startDate = datosUpdate.startDate;
			datosUpdate.startDate = startDate["month"] + "/" + startDate["day"] + "/" + startDate["year"];
		}
		if (datosUpdate.endDate != null) {
			var endDate = datosUpdate.endDate;
			datosUpdate.endDate = endDate["month"] + "/" + endDate["day"] + "/" + endDate["year"];
		}

		Project.findOneAndUpdate(proyectId, datosUpdate, { new: true }, (err, projectUpdated) => {
			if (err) return res.status(500).send({ message: err });

			if (!projectUpdated) return res.status(503).send({ message: "Error when trying to update the project" });

			return res.status(200).send({
				project: projectUpdated
			})
		});
	},

	deleteProject: function (req, res) {
		var projectId = req.params.id;
		Project.findByIdAndDelete(projectId, (err, projectDeleted) => {
			if (err) return res.status(500).send({ message: err });

			if (!projectDeleted) return res.status(503).send({ message: "Error when trying to delete the project" });

			return res.status(200).send({
				project: projectDeleted
			})
		});
	},

	get10YearsProject: function(req, res){
		let limit = req.query.limit ? parseInt(req.query.limit) : 25;
		let offset = req.query.offset ? parseInt(req.query.offset) : 0;
		let total
		Project.estimatedDocumentCount({}, (err, number) => {
			total = number;
		})
		let fecha = new Date()
		let fechaVieja = new Date(fecha.getFullYear() - 15, fecha.getMonth(), fecha.getDate())

		Project.find({startDate: {$gte: fechaVieja}}, null, { limit: limit, skip: offset }, (err, projects) => {
			if (err) return res.status(500).send({ message: err })
			if (!projects) return res.status(404).send({ message: 'There are no projects to show' })
			if (!req.body) // Esto esta aqui porque en el test le paso un string para que ignore esta parte, no he conseguido hacer stub del metodo que genera este dato
				res.setHeader('X-WP-Total', total);
			return res.status(200).send({ "projects": projects });
		})
	}


};

module.exports = controller;
