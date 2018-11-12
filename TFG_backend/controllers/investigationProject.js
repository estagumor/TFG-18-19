'use strict' // Para usar cosas buenas de js

var InvestigationProject = require('../models/investigationProject'); // Aporta el modelo y los metodos de la bd

var controller = {

	saveProject : function(req, res) { // Metodo para crear proyectos
		var project = new InvestigationProject();

		var params = req.body; // Recoje los parametros que le llegan y los mete en un project nuevo
		console.log(params);
		project.researchTeam = params.researchTeam;
		project.workTeam = params.workTeam;
		project.hiredStaff = params.hiredStaff;
		project.title = params.title;
		project.descripton = params.description;
		project.leader = params.leader;
		project.reference = params.reference;
		project.scope = params.scope;
		project.status = params.status;
		project.sponsor = params.sponsor;
		project.startDate = params.startDate;
		project.endDate = params.endDate;
		project.amount = params.amount;
		project.relatedPublications = params.relatedPublications;
		project.relatedTools = params.relatedTools;

		project.save((err, projectStored) => { // Intenta guardarlo y segun vaya responde
			if (err) return res.status(500).send({message : "Error en la peticion"});

			if (!projectStored) return res.status(404).send({message : "No se ha podido guardar el proyecto"});

			return res.status(200).send({project: projectStored});
		});
	},

	getProject: function(req, res){
		var projectId = req.params.id;

		if(projectId == null){
			return res.status(404).send({message: 'El proyecto no existe'})
		}

		InvestigationProject.findById(projectId, (err, project) => {
			if (err) return res.status(500).send({
				message: "Error al devolver los datos"
			});

			if (!project) return res.status(404).send({
				message: "El projecto no existe"
			});

			return res.status(200).send({
				project
			});
		});
	},

	getProjects: function(req, res){
//		find({year: 2019}) para filtrar que tengan ese año
//		find({}).sort('year') ordenar por campo
		InvestigationProject.find({}).exec((err, projects)=>{
			if (err) return res.status(500).send({message: 'Error al devolver los datos'})
			if(!projects) return res.status(404).send({message: 'No hay projectos que mostrar'})
			return res.status(200).send({projects});
		});
	},

	updateProject: function(req, res){
		var projectId = req.params.id;
		var datosUpdate = req.body;

		InvestigationProject.findByAndUpdate(proyectId, datosUpdate, {new: rtrue}, (err, projectUpdated) => {
			if (err) return res.status(500).send({message: "Error al actualizar"});

			if(!projectUpdated) return res.status(404).send({message: "No se ha podido actualizar"});

			return res.status(200).send({
				project: projectUpdated
			})
		});


	},

	deleteProject: function(req, res){
		var projectId = req.params.id;

		InvestigationProject.findByIdAndDelete(projectId, (err, projectDeleted) => {
			if(err) return res.status(500).send({message: 'No se ha podido borrar el proyecto'});

			if(!projectDeleted) return res.status(404).send({message: "No se puede eliminar ese proyecto"});

			return res.status(200).send({
				project: projectRemoved
			})
		});
	}
};

module.exports = controller;
