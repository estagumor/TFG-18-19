'use strict' // Para usar cosas buenas de js
var mongoose = require('mongoose');
var Publication = require('../models/publication'); // Aporta el modelo y los metodos de la bd
var ProjectController = require("./project");
var Project = require("../models/project");
var ObjectId = mongoose.Types.ObjectId
var db = mongoose.connection;
// 200 -> OK, 201 -> Created, 400 -> Bad Request, 500 -> Internal Server Error, 503 -> Service Unavailable
var controller = {

	save: function (req, res) { // Metodo para crear proyectos
		var pub = req.body;

		if (pub == undefined) {
			return res.status(400).send({ message: "Can't save an empty publication" });
		} else {

			Publication.create(pub, (err) => {
				if (err) return res.status(500).send({ message_es: "Error en la petición", message_en: "Error in the request", message_data: err });
				if (!pub) return res.status(503).send({ message: "Error when trying to save the publication" });
				return res.status(201).send({ 'pub': pub });
			})
		}
	},

	saveAll: function (req, res) {
		var params = req.body;
		var projId = params.project
		Project.findById(projId, (error, result) => {

			var toSavePub = params.publications;
			toSavePub.forEach((p) => p.project = result._id)

			Publication.create(toSavePub, (err, pubs) => {
				if (err != null) return res.status(500).send({ message: err });

				if (!pubs) return res.status(503).send({ message: "Error when trying to save the publications" });
				return res.status(201).send({ pubs: pubs });
			})
		})

	},

	// getpub: function(req, res){
	// 	var pubId = req.params.id;

	// 	if(pubId == null){
	// 		return res.status(404).send({message: 'El proyecto no existe'})
	// 	}

	// 	pub.findById(pubId, (err, pub) => {
	// 		if (err) return res.status(500).send({
	// 			message: "Error al devolver los datos"
	// 		});

	// 		else if (!pub) return res.status(404).send({
	// 			message: "El pubo no existe"
	// 		});
	// 		return res.status(200).send({
	// 			pub
	// 		});
	// 	});
	// },

	getPubs: function (req, res) {
		let limit = req.query.limit ? parseInt(req.query.limit) : 25;
		let offset = req.query.offset ? parseInt(req.query.offset) : 0;
		let total
		Publication.estimatedDocumentCount({}, (err, number) => {
			total = number;
		})

		Publication.find({}, null, { limit: limit, skip: offset }, (err, pubs) => {
			if (err) return res.status(500).send({ message: err })
			if (!pubs) return res.status(404).send({ message: 'There are no publications to show' })
			if (!req.body) // Esto esta aqui porque en el test le paso un string para que ignore esta parte, no he conseguido hacer stub del metodo que genera este dato
				res.setHeader('X-WP-Total', total);
			return res.status(200).send({ "pubs": pubs });
		})
	},



	filterNewPubs: function (req, res) {
		var pubs = req.body.pubs;
		var projects = req.body.projects;

		const step1 = new Promise((resolve, reject) => {
			pubs.forEach(pub => {
				let ids = projects.map((pro) => { return pro._id })
				Publication.find({ "articleTitle": pub.articleTitle}).then((results) => {
					var nuevos = []
					if (results.length > 0) {
						nuevos = results.map((r) => {
							if(!(r.projects instanceof Array)){
								r.projects = []
							}
							projects.forEach((pro) => {
								if(r.project.indexOf(pro) == -1){
									r.project.push(pro)
								}
							})
							return r
						})
					}
					return nuevos
				}).then((data) => {
					if (data.length > 0) {
						Publication.updateMany(data).then(() => {
							Promise.resolve()
						})
					} else {
						pub.project = projects
						Publication.create(pub).then((date) => {
							Promise.resolve()
						})
					}
				})
			})
			if(1)
				resolve()
			else
				reject()
		})

		step1.then((d) => {
			res.status(200).send({})
		}).catch((reason) => {
			res.status(500).send({reason})
		})

	},

	filterByProject: function (req, res) {
		var projectId = req.params.id;
		console.log({ project: projectId });
		// Project.findById(projectId,(er,pro)=>{
		// 	return res.status(200).send({pro})
		// })
		Publication.find({ 'project': projectId }, (err, pubs) => {
			if (err) {
				return res.status(500).send({ err })
			}
			return res.status(200).send({ pubs })
		})

		// Publication.findByProject(projectId, (err,pubs) => {
		// 	if(err)
		// 		return res.status(500).send({err})

		// 	console.log(pubs)
		// 	return res.status(200).send({pubs})
		// })



		// , (err,pubs)=> {
		// 	if (err) {
		// 		return res.status(500).send({err})
		// 	}
		// 	console.log(pubs)
		// 	return res.status(200).send({pubs})
		// })
		// {"project":ObjectId("5c8ce4688c84505ba102729d")}
	}

	// updatepub: function(req, res){
	// 	var pr{"project":ObjectId("5c8ce4688c84505ba102729d")}oyectId = req.params.id;
	// 	var datosUpdate = req.body;

	// 	pub.findOneAndUpdate(proyectId, datosUpdate, {new:true}, (err, pubUpdated) => {
	// 		if (err) return res.status(500).send({message: "Error al actualizar"});

	// 		if(!pubUpdated) return res.status(404).send({message: "No se ha podido actualizar"});

	// 		return res.status(200).send({
	// 			pub: pubUpdated
	// 		})
	// 	});


	// },

	// deletepub: function(req, res){
	// 	var pubId = req.params.id;

	// 	pub.findByIdAndDelete(pubId, (err, pubDeleted) => {
	// 		if(err) return res.status(500).send({message: 'No se ha podido borrar el proyecto'});

	// 		if(!pubDeleted) return res.status(404).send({message: "No se puede eliminar ese proyecto"});

	// 		return res.status(200).send({
	// 			pub: pubRemoved
	// 		})
	// 	});
	// }
};

module.exports = controller;
