'use strict'

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Person = require('./person');
//var Actor = require('./actor');
// var Publication = require('./publication')
//var Tool = require('./tool')

var PersonSchema = require('mongoose').model('Person').schema;

var ProjectSchema = Schema({
	researchTeam : {type: [PersonSchema],
		ref: 'Person',
		required: true},

	workTeam : {type: [PersonSchema],
		ref: 'Person', 
		required: true},

	hiredStaff : {type: [PersonSchema],
		ref: 'Person'},

	title : {type: String, required: true},
	description : String,
	leader : {type: [PersonSchema],
		ref: 'Person',
		required: true},
		
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