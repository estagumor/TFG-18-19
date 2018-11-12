'use strict'

var mongoose = require('mongoose');
var Actor = require('./actor');
var Publication = require('./publication')
var Tool = require('./tool')
var Schema = mongoose.Schema;

var ProjectSchema = Schema({
  researchTeam: [Actor],
  workTeam: [Actor],
  hiredStaff: [Actor],
  title: String,
  description: String,
  leader: [Actor],
  reference: String,
  scope: ['REGIONAL','NACIONAL','EUROPEO','OTROS'],
  status: ['RECHAZADO','ENVIADO','ACEPTADO'],
  sponsor: String,
  startDate: Date,
  endDate: Date,
  amount: Number,
  relatedPublications: [Publication],
  relatedTools: [Tool]
  
  
});

module.exports = mongoose.model('Project', ProjectSchema)