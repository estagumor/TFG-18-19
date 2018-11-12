'use strict'

var mongoose = require('mongoose');
var Project = require('./project')
var Schema = mongoose.Schema;

var InvestigationProject = Project.discriminator('InvestigatorProject', new mongoose.Schema({
	
}))

module.exports = mongoose.model('InvestigationProject', InvestigationProject)