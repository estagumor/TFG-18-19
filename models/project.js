'use strict'

var mongoose = require('mongoose');
//var Actor = require('./actor');
// var Publication = require('./publication')
//var Tool = require('./tool')
var Schema = mongoose.Schema;

var ProjectSchema = Schema({
	researchTeam : {type: [String], required: true},
	workTeam : {type: [String], required: true},
	hiredStaff : [ String ],
	title : {type: String, required: true},
	description : String,
	leader : {type: [String], required: true},
	reference : {type: String, unique: false},
	scope : {
		type : String,
		enum : [ 'REGIONAL', 'NACIONAL', 'EUROPEO', 'OTROS', 'NONE' ]
	},
	status : {
		type : String,
		enum : [ 'RECHAZADO', 'ENVIADO', 'ACEPTADO', 'NONE' ]
	},
	sponsor : String,
	startDate : Date,
	endDate : Date,
	amount : {type: Number, required: true},
	// relatedPublications : [ {type: Schema.Types.ObjectId, ref:'Publication'} ],
	relatedTools : [ String ]
});

module.exports = mongoose.model('Project', ProjectSchema);