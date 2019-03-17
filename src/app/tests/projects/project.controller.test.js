const chai = require("chai");
const chai_http = require("chai-http");
//const expect = chai.expect;
const sinon = require("sinon");
var Project = require('../../../models/project');
chai.use(chai_http);
url = 'http://localhost:3700/projects';

const expect = require('chai').expect
const app = require('../../../app');

describe("**Saving a public project**", function () {
    /*
    it("Testing chai-http. Index (request)", function() {
        chai.request(url).get('/').end(function(err,res) {
            expect(res).to.have.status(200);
            done();
        });
    });

    it("Wrong data. Should raise a 500 code", function() {
        chai.request(url).post('/project').type('form').send({'researchTeam': 50, 'workTeam': "Pepito", 'hiredStaff': "", 'title': "Proyecto publico", 'description': "Descripcion", 'leader': "Pepito", 'reference': "", 'scope': "REGIONAL", 'status': "ENVIADO", 'sponsor': "Cocacola", 'startDate': "06/06/2016", 'endDate': "08/04/2020", 'amount': 10000, 'relatedTools': "" }).end(function(err,res){
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
        chai.request(url).post('/project').type('form').send({'researchTeam': "Juan,Pepito", 'workTeam': "Pepito", 'hiredStaff': "", 'title': "Proyecto publico", 'description': "Descripcion", 'leader': "Pepito", 'reference': "", 'scope': "REGIONAL", 'status': "ENVIADO", 'sponsor': "Cocacola", 'startDate': "06/06/2016", 'endDate': "08/04/2020", 'amount': 10000,  'relatedTools': "" }).end(function(err,res){
            expect(res).to.have.status(200);
            done();
        });
    });
    */
    //Setear el timeout
    //this.timeout(5000);



    it('should create a new public project', (done) => {
        startDate = { year: 2017, month: 3, day: 5 }
        endDate = { year: 2019, month: 3, day: 5 }
        var project = { 'researchTeam': "Juan,Pepito", 'workTeam': "Pepito", 'hiredStaff': "Mijitas", 'title': "Prueba2", 'description': "Descripcion", 'leader': "Pepito", 'reference': "333222333", 'scope': "REGIONAL", 'status': "ENVIADO", 'sponsor': "sponsor2", 'startDate': startDate, 'endDate': endDate, 'amount': 10000, 'relatedTools': [] };
        var projectMocked = { 'researchTeam': "Juan,Pepito", 'workTeam': "Pepito", 'hiredStaff': "Mijitas", 'title': "Prueba2", 'description': "Descripcion", 'leader': "Pepito", 'reference': "333222333", 'scope': "REGIONAL", 'status': "ENVIADO", 'sponsor': "sponsor2", 'startDate': startDate["month"] + "/" + startDate["day"] + "/" + startDate["year"], 'endDate': endDate["month"] + "/" + endDate["day"] + "/" + endDate["year"], 'amount': 10000, 'relatedTools': [] };

        var dbMock = sinon.mock(Project);
        dbMock.expects('create').withArgs(projectMocked).yields(null);

        chai.request(app)
            .post('/api/project')
            .send(project)
            .end((err, res) => {
                expect(res).to.have.status(201);
                dbMock.verify();
                done();
            });
    });

    it('should return 500. Wrong data', (done) => {
        startDate = { year: 2017, month: 3, day: 5 }
        endDate = { year: 2019, month: 3, day: 5 }
        var project = { 'researchTeam': 3, 'workTeam': "Pepito", 'hiredStaff': "Mijitas", 'title': "Prueba2", 'description': "Descripcion", 'leader': "Pepito", 'reference': "333222333", 'scope': "REGIONAL", 'status': "ENVIADO", 'sponsor': "sponsor2", 'startDate': startDate, 'endDate': endDate, 'amount': 10000,'relatedTools': [] };
        var projectMocked = { 'researchTeam': 3, 'workTeam': "Pepito", 'hiredStaff': "Mijitas", 'title': "Prueba2", 'description': "Descripcion", 'leader': "Pepito", 'reference': "333222333", 'scope': "REGIONAL", 'status': "ENVIADO", 'sponsor': "sponsor2", 'startDate': startDate["month"] + "/" + startDate["day"] + "/" + startDate["year"], 'endDate': endDate["month"] + "/" + endDate["day"] + "/" + endDate["year"], 'amount': 10000, 'relatedTools': [] };
        var dbMock = sinon.mock(Project);
        dbMock.expects('create').withArgs(projectMocked).yields(true);

        chai.request(app)
            .post('/api/project')
            .send(project)
            .end((err, res) => {
                expect(res).to.have.status(500);
                dbMock.verify();
                done();
            });

    });
});
/*
describe("**Getting a public project**", function() {
Esta comentado porque no se puede usar el find mas de una vez sin liarla un poco, como tampoco hace extremada falta se queda asi
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


it('should return the public project', (done) => {
    var project = new Project({'researchTeam': "persona1, persona2", 'workTeam': "persona2,persona3", 'hiredStaff': "persona4", 'title': "Proyecto prueba1", 'description': "Descripcion", 'leader': "persona1", 'reference': "666111666", 'scope': "REGIONAL", 'status': "ENVIADO", 'sponsor': "sponsor1", 'startDate': { year: 2017, month: 3, day: 5 }, 'endDate': { year: 2021, month: 3, day: 5 }, 'amount': 10000,  'relatedTools': []})

    var projectStub = sinon.stub(Project, 'find');
    projectStub.yields(null, [project]);
    chai.request(app).get('/api/projects').end((err, res) => {
        expect(res).to.have.status(200);
        // console.log(res.body)
        expect(res.body.projects).to.be.an('array');
        expect(res.body.projects).to.have.lengthOf(1);
        done();
    });
});

});
*/

describe("**Listing public projects**", function () {
    // it("Right url. Should get 200 code", function() {
    //     chai.request(url).get('/projects').end(function(err,res) {
    //         expect(res).to.have.status(200);
    //         done();
    //     });
    // });

    it('should return all public projects', (done) => {
        var project = new Project({ 'researchTeam': "persona1, persona2", 'workTeam': "persona2,persona3", 'hiredStaff': "persona4", 'title': "Proyecto prueba1", 'description': "Descripcion", 'leader': "persona1", 'reference': "666111666", 'scope': "REGIONAL", 'status': "ENVIADO", 'sponsor': "sponsor1", 'startDate': { year: 2017, month: 3, day: 5 }, 'endDate': { year: 2021, month: 3, day: 5 }, 'amount': 10000, 'relatedTools': [] })
        var project1 = new Project({ 'researchTeam': "persona1, persona3", 'workTeam': "persona6", 'hiredStaff': "persona4", 'title': "Proyecto prueba2", 'description': "Descripcion", 'leader': "persona1", 'reference': "666111667", 'scope': "REGIONAL", 'status': "ENVIADO", 'sponsor': "sponsor1", 'startDate': { year: 2017, month: 3, day: 5 }, 'endDate': { year: 2021, month: 3, day: 5 }, 'amount': 10000, 'relatedTools': [] })
        var project2 = new Project({ 'researchTeam': "persona1, persona4", 'workTeam': "persona7", 'hiredStaff': "persona4", 'title': "Proyecto prueba3", 'description': "Descripcion", 'leader': "persona1", 'reference': "666111668", 'scope': "REGIONAL", 'status': "ENVIADO", 'sponsor': "sponsor1", 'startDate': { year: 2017, month: 3, day: 5 }, 'endDate': { year: 2021, month: 3, day: 5 }, 'amount': 10000, 'relatedTools': [] })
        var project3 = new Project({ 'researchTeam': "persona1, persona5", 'workTeam': "persona8", 'hiredStaff': "persona4", 'title': "Proyecto prueba4", 'description': "Descripcion", 'leader': "persona1", 'reference': "666111669", 'scope': "REGIONAL", 'status': "ENVIADO", 'sponsor': "sponsor1", 'startDate': { year: 2017, month: 3, day: 5 }, 'endDate': { year: 2021, month: 3, day: 5 }, 'amount': 10000, 'relatedTools': [] })

        var projectStub = sinon.stub(Project, 'find');
        projectStub.yields(null, [project, project1, project2, project3]);
        chai.request(app).get('/api/projects').end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body.projects).to.be.an('array');
            expect(res.body.projects).to.have.lengthOf(4);
            done();
        });
    });
});

/*
describe("**Updating public projects**", function() {

    it('Id 1. Changing the research team. Should raise a 200 code', function() {
        chai.request(url).put('/project/1').type('form').send({'researchTeam': "Lola", 'workTeam': "Pepito", 'hiredStaff': "", 'title': "Proyecto publico", 'description': "Descripcion", 'leader': "Pepito", 'reference': "", 'scope': "REGIONAL", 'status': "ENVIADO", 'sponsor': "Cocacola", 'startDate': "06/06/2016", 'endDate': "08/04/2020", 'amount': 10000, 'relatedTools': "" }).end(function(err,res){
            expect(res.body).to.have.property('researchTeam').to.be.equal('Lola');
            expect(res).to.have.status(200);
            done();
        });
    });
    it("Id 1. Wrong data. Should raise a 500 code", function() {
        chai.request(url).put('/project/1').type('form').send({'researchTeam': 50, 'workTeam': "Pepito", 'hiredStaff': "", 'title': "Proyecto publico", 'description': "Descripcion", 'leader': "Pepito", 'reference': "", 'scope': "REGIONAL", 'status': "ENVIADO", 'sponsor': "Cocacola", 'startDate': "06/06/2016", 'endDate': "08/04/2020", 'amount': 10000, 'relatedTools': "" }).end(function(err,res){
            expect(res.body).to.have.property('researchTeam').to.be.equal(50);
            expect(res).to.have.status(500);
            done();
        });
    });

   var project = new Project({'researchTeam': "persona1, persona2", 'workTeam': "persona2,persona3", 'hiredStaff': "persona4", 'title': "Proyecto prueba1", 'description': "Descripcion", 'leader': "persona1", 'reference': "666111666", 'scope': "REGIONAL", 'status': "ENVIADO", 'sponsor': "sponsor1", 'startDate': { year: 2017, month: 3, day: 5 }, 'endDate': { year: 2021, month: 3, day: 5 }, 'amount': 10000, 'relatedTools': []})
   var projectUpdated = new Project({'researchTeam': "persona1", 'workTeam': "persona2", 'hiredStaff': "", 'title': "Proyecto updateado", 'description': "Descripcion", 'leader': "persona1", 'reference': "666111677", 'scope': "REGIONAL", 'status': "ENVIADO", 'sponsor': "sponsor1", 'startDate': { year: 2018, month: 3, day: 5 }, 'endDate': { year: 2021, month: 3, day: 5 }, 'amount': 10000, 'relatedTools': []})

   var projectStub = sinon.stub(Project, 'update');
   projectStub.yields(null, [projectUpdated]);

   it('should update the public project', (done) => {
       chai.request(app).get('/api/projects').end((err, res) => {
           expect(res).to.have.status(200);
           expect(res.body).to.be.an('array');
           expect(res.body).to.have.lengthOf(4);
           done();
       });
   });
});
/*
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
*/