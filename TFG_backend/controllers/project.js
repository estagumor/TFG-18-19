'use strict'

var Project = require('../models/project');

var controller = {
	home : function(req, res) {
		return res.status(200).send({
			message : "Soy la home"
		})
	},
	test : function(req, res) {
		return res.status(200).send({
			message : "Soy el test"
		})
	},

	saveProject : function(req, res) {
		var project = new Project();

		var params = req.body;
		console.log(params);
		project.reference = params.reference;
		project.competency = params.competency;
		project.investigationGroup = params.investigationGroup;
		project.hiredPersonal = params.hiredPersonal;
		project.status = params.status;
		project.publications = params.publications;
		project.relatedTools = params.relatedTools;

		project.save((err, projectStored) => {
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
		
		Project.findById(projectId, (err, project) => {
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
		Project.find({}).exec((err, projects)=>{
			if (err) return res.status(500).send({message: 'Error al devolver los datos'})
			if(!projects) return res.status(404).send({message: 'No hay projectos que mostrar'})
			return res.status(200).send({projects});
		});
	},
	
	updateProject: function(req, res){
		var projectId = req.params.id;
		var datosUpdate = req.body;
		
		Project.findByAndUpdate(proyectId, datosUpdate, {new:true}, (err, projectUpdated) => {
			if (err) return res.status(500).send({message: "Error al actualizar"});
			
			if(!projectUpdated) return res.status(404).send({message: "No se ha podido actualizar"});
			
			return res.status(200).send({
				project: projectUpdated
			})
		});
		
		
	},
	
	deleteProject: function(req, res){
		var projectId = req.params.id;
		
		Project.findByIdAndDelete(projectId, (err, projectDeleted) => {
			if(err) return res.status(500).send({message: 'No se ha podido borrar el proyecto'});
			
			if(!projectDeleted) return res.status(404).send({message: "No se puede eliminar ese proyecto"});
			
			return res.status(200).send({
				project: projectRemoved
			})
		});
	}
};

module.exports = controller;