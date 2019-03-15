'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var PublicationSchema = Schema({
    scopusId: String,
    articleTitle: {type: String, required: true},
    sourceType: {
        type: String,
        enum: ['Journal','Book','Book Series','Conference Proceeding', 
        'Report', 'Trade Publication']
    },
    documentType: {
        type: String,
        enum: ['Article','Abstract Report','Article in Press',
        'Book','Business Article','Book Chapter','Conference Paper',
        'Conference Review','Editorial','Erratum','Letter','Note',
        'Press Release','Review','Short Survey']
    },
    sourceTitle: String,
    sourceIdentifier: String,
    sourceVolume: String,
    pageRange: String,
    publicationDate: String,
    DOI: String,
    ORCID: String,
    firstAuthor: {type: String, required: true},
    affiliation: String,
    assigned: Boolean
});

module.exports = mongoose.model('Publication', PublicationSchema)