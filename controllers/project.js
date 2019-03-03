'use strict' // Para usar cosas buenas de js
var mongoose = require('mongoose');
var Project = require('../models/project'); // Aporta el modelo y los metodos de la bd
var db = mongoose.connection;
// 200 -> OK, 201 -> Created, 400 -> Bad Request, 500 -> Internal Server Error, 503 -> Service Unavailable
var controller = {

	saveProject: function (req, res) { // Metodo para crear proyectos
		var project = new Project();
		var params = req.body; // Recoje los parametros que le llegan y los mete en un project nuevo
		if (params == undefined) { //No se ha creado el proyecto
			return res.status(400).send({ message: "No se puede guardar un proyecto que no existe" });
		} else {
			project.researchTeam = params.researchTeam;
			project.workTeam = params.workTeam;
			project.hiredStaff = params.hiredStaff;
			project.title = params.title;
			project.description = params.description;
			project.leader = params.leader;
			project.reference = params.reference;
			project.scope = params.scope;
			project.status = params.status;
			project.sponsor = params.sponsor;
			var startDate = params.startDate;
			project.startDate = startDate["month"] + "/" + startDate["day"] + "/" + startDate["year"];
			var endDate = params.endDate;
			project.endDate = endDate["month"] + "/" + endDate["day"] + "/" + endDate["year"];
			project.amount = params.amount;
			project.relatedPublications = params.relatedPublications;
			project.relatedTools = params.relatedTools;

			project.save((err, projectStored) => { // Intenta guardarlo y segun vaya responde
				if (err) return res.status(500).send({ message: "Error en la peticion" });

				if (!projectStored) return res.status(503).send({ message: "No se ha podido guardar el proyecto" });
				return res.status(201).send({ project: projectStored });
			});
		}
	},

	getProject: function (req, res) {
		var projectId = req.params.id;

		if (projectId == null) {
			return res.status(400).send({ message: 'El proyecto no existe' })
		}

		Project.findById(projectId, (err, project) => {
			if (err) return res.status(500).send({
				message: "Error al devolver los datos"
			});

			else if (!project) return res.status(404).send({
				message: "El projecto no existe"
			});

			return res.status(200).send({
				project
			});
		});
	},

	getProjects: function (req, res) {
		//		find({year: 2019}) para filtrar que tengan ese año
		//		find({}).sort('year') ordenar por campo
		let limit = req.query.limit ? parseInt(req.query.limit) : 25;
		let offset = req.query.offset ? parseInt(req.query.offset) : 0;
		let total
		db.collection("projects").stats().then(function (stats) {
			total = stats.count
			db.collection("projects").find({}).skip(offset).limit(limit).toArray(function (err, docs) {
				if (err) {
					handleError(res, err.message, "Failed to get contacts.");
				} else {
					res.setHeader('X-WP-Total', total)
					res.status(200).json(docs);
				}
			});
		});
		//		InvestigationProject.find({}).exec((err, projects)=>{
		//			if (err) return res.status(500).send({message: 'Error al devolver los datos'})
		//			if(!projects) return res.status(404).send({message: 'No hay projectos que mostrar'})
		//			return res.status(200).send({projects});
		//		});
	},

	findByTitle: function (req, res) {
		var titulo = req.params.title;

		if (titulo == null) {
			return res.status(400).send({ message: 'No ha introducido bien el titulo' })
		}

		Project.find({ title: titulo }).exec((err, projects) => {
			if (err) return res.status(500).send({ message: 'Error al devolver los datos' })
			if (!projects) return res.status(503).send({ message: 'No hay projectos que mostrar' })
			return res.status(200).send({ projects });
		});

	},

	findByReference: function (req, res) {
		var referencia = req.params.reference;

		if (referencia == null) {
			return res.status(400).send({ message: 'No ha introducido bien la referencia' })
		}

		Project.find({ reference: referencia }).exec((err, projects) => {
			if (err) return res.status(500).send({ message: 'Error al devolver los datos' })
			if (!projects) return res.status(503).send({ message: 'No hay projectos que mostrar' })
			return res.status(200).send({ projects });
		});
	},

	updateProject: function (req, res) {
		var proyectId = req.params.id;
		var datosUpdate = req.body;

		Project.findOneAndUpdate(proyectId, datosUpdate, { new: true }, (err, projectUpdated) => {
			if (err) return res.status(500).send({ message: "Error al actualizar" });

			if (!projectUpdated) return res.status(503).send({ message: "No se ha podido actualizar" });

			return res.status(200).send({
				project: projectUpdated
			})
		});
	},

	deleteProject: function (req, res) {
		var projectId = req.params.id;

		Project.findByIdAndDelete(projectId, (err, projectDeleted) => {
			if (err) return res.status(500).send({ message: 'No se ha podido borrar el proyecto' });

			if (!projectDeleted) return res.status(503).send({ message: "No se puede eliminar ese proyecto" });

			return res.status(200).send({
				project: projectRemoved
			})
		});
	}


};

module.exports = controller;
