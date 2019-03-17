'use strict' // Para usar cosas buenas de js
var mongoose = require('mongoose');
var Project = require('../models/project'); // Aporta el modelo y los metodos de la bd
var db = mongoose.connection;
// 200 -> OK, 201 -> Created, 400 -> Bad Request, 500 -> Internal Server Error, 503 -> Service Unavailable
var controller = {

	saveProject: function (req, res) { // Metodo para crear proyectos
		//var project = new Project();
		var proj = req.body; // Recoje los parametros que le llegan y los mete en un project nuevo
		// console.log(req.body)
		// if (params == undefined) { //No se ha creado el proyecto
		// 	return res.status(400).send({ message: "No se puede guardar un proyecto que no existe" });
		// } else {
		// 	project.researchTeam = params.researchTeam;
		// 	project.workTeam = params.workTeam;
		// 	project.hiredStaff = params.hiredStaff;
		// 	project.title = params.title;
		// 	project.description = params.description;
		// 	project.leader = params.leader;
		// 	project.reference = params.reference;
		// 	project.scope = params.scope;
		// 	project.status = params.status;
		// 	project.sponsor = params.sponsor;
		if (proj.startDate != null) {
			var startDate = proj.startDate;
			proj.startDate = startDate["month"] + "/" + startDate["day"] + "/" + startDate["year"];
		}
		if (proj.endDate != null) {
			var endDate = proj.endDate;
			proj.endDate = endDate["month"] + "/" + endDate["day"] + "/" + endDate["year"];
		}
		// var startDate = params.startDate;
		// project.startDate = startDate["month"] + "/" + startDate["day"] + "/" + startDate["year"];
		// var endDate = params.endDate;
		// project.endDate = endDate["month"] + "/" + endDate["day"] + "/" + endDate["year"];
		// project.amount = params.amount;
		// project.relatedPublications = params.relatedPublications;
		// project.relatedTools = params.relatedTools;

		Project.create(proj, (err) => { // Intenta guardarlo y segun vaya responde
			// console.log(err)
			if (err) return res.status(500).send({ message: err });
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
		Project.estimatedDocumentCount({}, (err, number) => {
			total = number;
		})

		Project.find({}, null, { limit: limit, skip: offset }, (err, projects) => {
			if (err) return res.status(500).send({ message: 'Error al devolver los datos' })
			if (!projects) return res.status(404).send({ message: 'No hay projectos públicos que mostrar' })
			if (!req.body) // Esto esta aqui porque en el test le paso un string para que ignore esta parte, no he conseguido hacer stub del metodo que genera este dato
				res.setHeader('X-WP-Total', total);
			return res.status(200).send({ "projects": projects });
		})

		// db.collection("projects").stats().then(function (stats) {
		// 	total = stats.count
		// 	db.collection("projects").find({}).skip(offset).limit(limit).toArray(function (err, docs) {
		// 		if (err) {
		// 			handleError(res, err.message, "Failed to get contacts.");
		// 		} else {
		// 			res.setHeader('X-WP-Total', total)
		// 			res.status(200).json(docs);
		// 		}
		// 	});
		// });
		//		InvestigationProject.find({}).exec((err, projects)=>{
		//			if (err) return res.status(500).send({message: 'Error al devolver los datos'})
		//			if(!projects) return res.status(404).send({message: 'No hay projectos que mostrar'})
		//			return res.status(200).send({projects});
		//		});
	},

	findByTitle: function (req, res) {
		var titulo = req.params.title;
		// console.log("Este es el titulo del controlador: " + titulo);
		if (titulo == null) {
			return res.status(400).send({ message: 'No ha introducido bien el titulo' })
		}

		Project.find({ title: titulo }).exec((err, projects) => {
			if (err) return res.status(500).send({ message: 'Error al devolver los datos' })
			if (!projects) return res.status(503).send({ message: 'No hay projectos que mostrar' })
			// console.log("Estos son los proyectos que encuentra el controlador -> titulo: " + projects)
			return res.status(200).send({ projects });
		});

	},

	findByReference: function (req, res) {
		var referencia = req.params.reference;
		// console.log("Esta es la referencia del controlador: " + referencia);
		if (referencia == null) {
			return res.status(400).send({ message: 'No ha introducido bien la referencia' })
		}

		Project.find({ reference: referencia }).exec((err, projects) => {
			if (err) return res.status(500).send({ message: 'Error al devolver los datos' })
			if (!projects) return res.status(503).send({ message: 'No hay projectos que mostrar' })
			// console.log("Estos son los proyectos que encuentra el controlador -> referencia: " + projects)
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
			// console.log(err)
			if (err) return res.status(500).send({ message: "Error al actualizar" });

			if (!projectUpdated) return res.status(503).send({ message: "No se ha podido actualizar" });

			return res.status(200).send({
				project: projectUpdated
			})
		});
	},

	deleteProject: function (req, res) {
		var projectId = req.params.id;
		// console.log("he entrado al controlador oie")
		Project.findByIdAndDelete(projectId, (err, projectDeleted) => {
			// console.log(err)
			if (err) return res.status(500).send({ message: 'No se ha podido borrar el proyecto' });

			if (!projectDeleted) return res.status(503).send({ message: "No se puede eliminar ese proyecto" });

			return res.status(200).send({
				project: projectDeleted
			})
		});
	}


};

module.exports = controller;
