'use strict'

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Person = require('./person'),
    ObjectId = mongoose.Types.ObjectId;

var PersonSchema = require('mongoose').model('Person').schema;
var ProjectSchema = require('mongoose').model('Project').schema;

var PublicationSchema = Schema({
    scopusId: String,
    articleTitle: { type: String, required: true },
    sourceType: {
        type: String,
        enum: ['Journal', 'Book', 'Book Series', 'Conference Proceeding',
            'Report', 'Trade Publication']
    },
    documentType: {
        type: String,
        enum: ['Article', 'Abstract Report', 'Article in Press',
            'Book', 'Business Article', 'Book Chapter', 'Conference Paper',
            'Conference Review', 'Editorial', 'Erratum', 'Letter', 'Note',
            'Press Release', 'Review', 'Short Survey']
    },
    sourceTitle: String,
    sourceIdentifier: String,
    sourceVolume: String,
    pageRange: String,
    publicationDate: String,
    DOI: String,
    ORCID: String,
    authors: {
        type: [PersonSchema],
        ref: 'Person',
        required: true
    },
    affiliation: String,
    assigned: Boolean,
    project: { type: [ProjectSchema], ref: 'Project' }
});

module.exports = mongoose.model('Publication', PublicationSchema)

