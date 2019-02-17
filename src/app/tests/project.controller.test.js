const chai = require("chai");
const chai_http = require("chai-http");
//const expect = chai.expect;
//const sinon = require("sinon");

chai.use(chai_http);
url = 'http://localhost:3700/projects';

const expect = require('chai').expect
const mongoose = require('mongoose')
const mongoUnit = require('../index') //?¿?¿?¿
const service = require('./../services/project.service.ts') 
const testMongoUrl = process.env.MONGO_URL

describe('**Testing the BD**', () => {
 const testData = require('./testData.json');
 beforeEach(() => mongoUnit.initDb(testMongoUrl, testData))
 afterEach(() => mongoUnit.drop())

 it('should find all projects', () => {
   return service.getProjects()
     .then(projects => {
       expect(projects.length).to.equal(1)
       expect(projects[0].title).to.equal('Proyecto publico')
     });
 });

 it('should create new project', () => {
   return service.createV2({'researchTeam': "Jaja,jeje", 'workTeam': "Jeje", 'hiredStaff': "", 'title': "Jaja jeje", 'description': "Descripcion", 'leader': "Jaja", 'reference': "", 'scope': "REGIONAL", 'status': "ENVIADO", 'sponsor': "", 'startDate': "05/05/2015", 'endDate': "08/08/2028", 'amount': 10000, 'relatedPublications': "", 'relatedTools': ""  })
     .then(project => {
       expect(project.title).to.equal('Jaja jeje')
       expect(project.workTeam).to.equal('Jeje')
       //Se haría con todo
     })
     .then(() => service.getProjects())
     .then(projects => {
       expect(projects.length).to.equal(2)
       expect(projects[1].title).to.equal('Jaja jeje')
     })
 })

 it('should remove task', () => {
   return service.getTasks()
     .then(tasks => tasks[0]._id)
     .then(taskId => service.deleteTask(taskId))
     .then(() => service.getTasks())
     .then(tasks => {
       expect(tasks.length).to.equal(0)
     })
 })
})

describe("**Saving a public project**", function() {
    it("Testing chai-http. Index (request)", function() {
        chai.request(url).get('/').end(function(err,res) {
            expect(res).to.have.status(200);
            done();
        });
    });

    it("Wrong data. Should raise a 500 code", function() {
        chai.request(url).post('/project').type('form').send({'researchTeam': 50, 'workTeam': "Pepito", 'hiredStaff': "", 'title': "Proyecto publico", 'description': "Descripcion", 'leader': "Pepito", 'reference': "", 'scope': "REGIONAL", 'status': "ENVIADO", 'sponsor': "Cocacola", 'startDate': "06/06/2016", 'endDate': "08/04/2020", 'amount': 10000, 'relatedPublications': "", 'relatedTools': "" }).end(function(err,res){
            expect(res).to.have.status(500);
            done();
        });
    });

    it("Without data. Should raise a 404 code", function() {
        chai.request(url).post('/project').type('form').send({}).end(function(err,res){
            expect(res).to.have.status(404);
            done();
        });
    });

    it("Right data. Should save it and return a 200 code", function() {
        chai.request(url).post('/project').type('form').send({'researchTeam': "Juan,Pepito", 'workTeam': "Pepito", 'hiredStaff': "", 'title': "Proyecto publico", 'description': "Descripcion", 'leader': "Pepito", 'reference': "", 'scope': "REGIONAL", 'status': "ENVIADO", 'sponsor': "Cocacola", 'startDate': "06/06/2016", 'endDate': "08/04/2020", 'amount': 10000, 'relatedPublications': "", 'relatedTools': "" }).end(function(err,res){
            expect(res).to.have.status(200);
            done();
        });
    });
});

describe("**Getting a public project**", function() {
    it("Id null. Should raise a 404 code", function() {
        chai.request(url).get('/project/').end(function(err,res) {
            expect(res).to.have.status(404);
            done();
        });
    });

    it("Id 1. Should raise a 200 code (if exist)", function() {
        chai.request(url).get('/project/1').end(function(err,res) {
            expect(res.body).to.have.property('id').to.be.equal(1);
            expect(res).to.have.status(200);
            done();
        });
    });
});

describe("**Listing public projects**", function() {
    it("Right url. Should get 200 code", function() {
        chai.request(url).get('/projects').end(function(err,res) {
            expect(res).to.have.status(200);
            done();
        });
    });
});

describe("**Updating public projects**", function() {
    it('Id 1. Changing the research team. Should raise a 200 code', function() {
        chai.request(url).put('/project/1').type('form').send({'researchTeam': "Lola", 'workTeam': "Pepito", 'hiredStaff': "", 'title': "Proyecto publico", 'description': "Descripcion", 'leader': "Pepito", 'reference': "", 'scope': "REGIONAL", 'status': "ENVIADO", 'sponsor': "Cocacola", 'startDate': "06/06/2016", 'endDate': "08/04/2020", 'amount': 10000, 'relatedPublications': "", 'relatedTools': "" }).end(function(err,res){
            expect(res.body).to.have.property('researchTeam').to.be.equal('Lola');
            expect(res).to.have.status(200);
            done();
        });
    }); 
    it("Id 1. Wrong data. Should raise a 500 code", function() {
        chai.request(url).put('/project/1').type('form').send({'researchTeam': 50, 'workTeam': "Pepito", 'hiredStaff': "", 'title': "Proyecto publico", 'description': "Descripcion", 'leader': "Pepito", 'reference': "", 'scope': "REGIONAL", 'status': "ENVIADO", 'sponsor': "Cocacola", 'startDate': "06/06/2016", 'endDate': "08/04/2020", 'amount': 10000, 'relatedPublications': "", 'relatedTools': "" }).end(function(err,res){
            expect(res.body).to.have.property('researchTeam').to.be.equal(50);
            expect(res).to.have.status(500);
            done();
        });
    });
});

describe("**Deleting public projects**", function() {
    if('Id 1. Should delete it (if exists)', function() {
        chai.request.url.del('/project/1').end(function(err,res) {
            console.log(res.body);
            expect(res).to.have.status(200);
            chai.request(url).get('/projects').end(function(err,res) {
                console.log(res.body);
                expect(res.body[0]).to.have.property('id').to.be.equal(0);
                expect(res).to.have.status(200);
                done();
            });
        });
    });
});