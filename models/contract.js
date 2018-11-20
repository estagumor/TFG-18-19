'use strict'
var mongoose = require('mongoose');
var Project = require('./project')
var Schema = mongoose.Schema;
var ContractProject = Project.discriminator('ContractProject', new Schema({
	
}))
module.exports = mongoose.model('ContractProject', ContractProject) 