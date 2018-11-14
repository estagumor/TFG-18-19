'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = Schema({
  reference: String,
  competency: String,
  investigationGroup: String,
  hiredPersonal: String,
  status: String,
  publications: String,
  relatedTools: String
});

module.exports = mongoose.model('Project', ProjectSchema)