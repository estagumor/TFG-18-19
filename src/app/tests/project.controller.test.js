const chai = require("chai");
const chai_http = require("chai-http");
const expect = chai.expect;
const sinon = require("sinon");

chai.use(chai_http);
url = 'http://localhost:4200/projects';

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
            expect(res).to.have.status(200);
            done();
        });
    });
});

describe("**Listing public projects**", function() {
});

describe("**Updating public projects**", function() {

});

describe("**Deleting public projects**", function() {

});