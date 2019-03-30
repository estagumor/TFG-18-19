'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PersonSchema = Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    email: {type: String, required: true},
    photo: {type: String, required: true},
    telf: {type: String, required: true},
    allowed: {type: Boolean, required: true},
    job: {
        type: String,
        enum: ['RESEARCHER','HIRED']
    },

    //If is researcher
    office: {type: String},
    scopusId: {type: String},
    professionalStatus: {
        type: String,
        enum: ['NONE','RESEARCHER','STUDENT','TECHNICIAN']
    },
    urls: {type: [String]},
    active: {type: Boolean}
});

module.exports = mongoose.model('Person', PersonSchema);