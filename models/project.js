'use strict'

var mongoose = require('mongoose');
//var Actor = require('./actor');
//var Publication = require('./publication')
//var Tool = require('./tool')
var Schema = mongoose.Schema;

var ProjectSchema = Schema({
	researchTeam : [ String ],
	workTeam : [ String ],
	hiredStaff : [ String ],
	title : String,
	description : String,
	leader : [ String ],
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
	amount : Number,
	relatedPublications : [ String ],
	relatedTools : [ String ]
});

module.exports = mongoose.model('Project', ProjectSchema);