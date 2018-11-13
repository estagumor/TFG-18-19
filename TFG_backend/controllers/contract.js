'use strict' // Para usar cosas buenas de js

var Contract = require('../models/contract'); // Aporta el modelo y los metodos de la bd

var controller = {

	saveContract : function(req, res) { // Metodo para crear contratos
		var contract = new Contract();

		var params = req.body; // Recoje los parametros que le llegan y los mete en un contract nuevo
		console.log(params);
		contract.reference = params.reference;
		contract.competency = params.competency;
		contract.investigationGroup = params.investigationGroup;
		contract.hiredPersonal = params.hiredPersonal;
		contract.status = params.status;
		contract.publications = params.publications;
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
		Contract.find({}).exec((err, contracts)=>{
			if (err) return res.status(500).send({message: 'Error al devolver los datos'})
			if(!contracts) return res.status(404).send({message: 'No hay contratos que mostrar'})
			return res.status(200).send({contracts});
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
