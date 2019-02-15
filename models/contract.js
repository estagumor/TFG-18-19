'use strict'

var mongoose = require('mongoose');
const Project = require('./project')
var Schema = mongoose.Schema;
var options = {discriminatorKey: 'kind'};

const Contract = Project.discriminator('ContractProject', new mongoose.Schema({
	
}))
module.exports = mongoose.model('ContractProject') 