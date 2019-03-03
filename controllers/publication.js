'use strict' // Para usar cosas buenas de js
var mongoose = require('mongoose');
var Publication = require('../models/publication'); // Aporta el modelo y los metodos de la bd
var db = mongoose.connection;
// 200 -> OK, 201 -> Created, 400 -> Bad Request, 500 -> Internal Server Error, 503 -> Service Unavailable
var controller = {

	save: function (req, res) { // Metodo para crear proyectos
		var pub = new Publication();
		var params = req.body;
		if (params == undefined) {
			return res.status(400).send({ message: "No se puede guardar un proyecto que no existe" });
		} else {
			pub.scopusId = params.scopusId;
			pub.articleTitle = params.articleTitle;
			pub.sourceType = params.sourceType;
			pub.documentType = params.documentType;
			pub.sourceTitle = params.sourceTitle;
			pub.sourceIdentifier = params.sourceIdentifier;
			pub.sourceVolume = params.sourceVolume;
			pub.pageRange = params.pageRange;
			pub.DOI = params.DOI;
			pub.ORCID = params.ORCID;
			if (params.publicationDate != null) {
				var publicationDate = params.publicationDate;
				pub.publicationDate = publicationDate["month"] + "/" + publicationDate["day"] + "/" + publicationDate["year"];
			}
			pub.firstAuthor = params.firstAuthor;
			pub.affiliation = params.affiliation;

			pub.save((err, pubStored) => { // Intenta guardarlo y segun vaya responde
				if (err) return res.status(500).send({ message: "Error en la peticion" + err });

				if (!pubStored) return res.status(503).send({ message: "No se ha podido guardar la publicacion" });
				return res.status(201).send({ 'pub': pubStored });
			});
		}
	},

	saveAll: function (req, res) {
		var params = req.body;
		Publication.insertMany(params, (err, pubs) => {
			if (err) return res.status(500).send({ message: "Error en la peticion" + err });

			if (!pubs) return res.status(503).send({ message: "No se han podido guardar las publicaciones" });
			return res.status(201).send({ pubs: pubs });
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
		// Publication.find({}).exec((err, pubs) => {
		// 	if (err) return res.status(500).send({ message: 'Error al devolver los datos' })
		// 	if (!pubs) return res.status(404).send({ message: 'No hay publicaciones que mostrar' })
		// 	return res.status(200).send({ "pubs": pubs });
		// });
		let limit = req.query.limit ? parseInt(req.query.limit) : 25;
		let offset = req.query.offset ? parseInt(req.query.offset) : 0;
		let total
		db.collection("publications").stats().then(function (stats) {
			total = stats.count
			db.collection("publications").find({}).skip(offset).limit(limit).toArray(function (err, docs) {
				if (err) {
					handleError(res, err.message, "Error al devolver los datos");
				} else {
					res.setHeader('X-WP-Total', total)
					res.status(200).json(docs);
				}
			});
		});
	}

	// updatepub: function(req, res){
	// 	var proyectId = req.params.id;
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
