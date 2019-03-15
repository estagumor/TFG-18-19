'use strict'

var mongoose = require('mongoose');
//var Actor = require('./actor');
//var Publication = require('./publication')
//var Tool = require('./tool')
var Schema = mongoose.Schema;

var ProjectSchema = Schema({
	researchTeam : {type: [String], required: true},
	workTeam : {type: [String], required: true},
	hiredStaff : [ String ],
	title : {type: String, required: true},
	description : String,
	leader : {type: [String], required: true},
	//TODO: quitar el unique y required
	reference : {type: String, unique: true, required: true},
	scope : {
		type : String,
		enum : [ 'REGIONAL', 'NACIONAL', 'EUROPEO', 'OTROS' ]
	},
	status : {
		type : String,
		enum : [ 'RECHAZADO', 'ENVIADO', 'ACEPTADO' ]
	},
	sponsor : String,
	startDate : Date,
	endDate : Date,
	amount : {type: Number, required: true},
	relatedPublications : [ String ],
	relatedTools : [ String ]
});

module.exports = mongoose.model('Project', ProjectSchema);