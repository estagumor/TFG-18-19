'use strict' // Para usar cosas buenas de js
var mongoose = require('mongoose');
var Contract = require('../models/contract'); // Aporta el modelo y los metodos de la bd

var db = mongoose.connection; //Declara la db
var controller = {

	saveContract : function(req, res) { // Metodo para crear contratos
		var contract = new Contract();

		var params = req.body; // Recoje los parametros que le llegan y los mete en un contract nuevo
		console.log(params);
		contract.researchTeam = params.researchTeam;
		contract.workTeam = params.workTeam;
		contract.hiredStaff = params.hiredStaff;
		contract.title = params.title;
		contract.descripton = params.description;
		contract.leader = params.leader;
		contract.reference = params.reference;
		contract.scope = params.scope;
		contract.status = params.status;
		contract.sponsor = params.sponsor;
		contract.startDate = params.startDate;
		contract.endDate = params.endDate;
		contract.amount = params.amount;
		contract.relatedPublications = params.relatedPublications;
		contract.relatedTools = params.relatedTools;

		contract.save((err, contractStored) => { // Intenta guardarlo y segun vaya responde
			if (err) return res.status(500).send({message : "Error en la peticion"});

			if (!contractStored) return res.status(404).send({message : "No se ha podido guardar el contrato"});

			return res.status(200).send({contract: contractStored});
		});
	},

	getContract: function(req, res){
		var contractId = req.params.id;

		if(contractId == null){
			return res.status(404).send({message: 'El contrato no existe'})
		}

		Contract.findById(contractId, (err, contract) => {
			if (err) return res.status(500).send({
				message: "Error al devolver los datos"
			});

			if (!contract) return res.status(404).send({
				message: "El contrato no existe"
			});

			return res.status(200).send({
				contract
			});
		});
	},

	getContracts: function(req, res){
		db.collection("projects").find({"__t": "Contract"}).toArray(function(err, docs) {
		    if (err) {
		      handleError(res, err.message, "Failed to get contacts.");
		    } else {
		      res.status(200).json(docs);
		    }
		  });
	},

	updateContract: function(req, res){
		var contractId = req.params.id;
		var datosUpdate = req.body;

		Contract.findByAndUpdate(contractId, datosUpdate, {new:true}, (err, contractUpdated) => {
			if (err) return res.status(500).send({message: "Error al actualizar"});

			if(!contractUpdated) return res.status(404).send({message: "No se ha podido actualizar"});

			return res.status(200).send({
				contract: contractUpdated
			})
		});


	},

	deleteContract: function(req, res){
		var contractId = req.params.id;
		console.log(contractId);
		Contract.findByIdAndDelete(contractId, (err, contractDeleted) => {
			if(err) return res.status(500).send({message: 'No se ha podido borrar el contrato'});

			if(!contractDeleted) return res.status(404).send({message: "No se puede eliminar ese contrato"});

			return res.status(200).send({
				contract: contractRemoved
			})
		});
	}
};

module.exports = controller;
