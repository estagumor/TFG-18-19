'use strict'

var mongoose = require('mongoose');
const Project = require('./project')
var Schema = mongoose.Schema;
var options = {discriminatorKey: 'kind'};

const Net = Project.discriminator('Net', new mongoose.Schema({
    
}))

module.exports = mongoose.model('Net')