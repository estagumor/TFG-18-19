'use strict'

var mongoose = require('mongoose');
const Project = require('./project')
var Schema = mongoose.Schema;
var options = {discriminatorKey: 'kind'};

const InvestigationProject = Project.discriminator('InvestigationProject', new mongoose.Schema({
    
}))

module.exports = mongoose.model('InvestigationProject')