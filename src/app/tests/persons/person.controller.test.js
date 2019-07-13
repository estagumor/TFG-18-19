const chai = require("chai");
const chai_http = require("chai-http");
const sinon = require("sinon");
var Person = require('../../../../models/person');
chai.use(chai_http);

const expect = require('chai').expect
const app = require('../../../../app');

describe("**Saving a new person**", function () {
    
    it('should create a new person', (done) => {
        var person = {'name': "Juan", 'surname': "Perez", 'email': "jperez@us.es", 'photo': "https://url.com/im.img", 'telf': "+34954954954", 'allowed': true, 'job': "HIRED"};
        var personMocked = {'name': "Juan", 'surname': "Perez", 'email': "jperez@us.es", 'photo': "https://url.com/im.img", 'telf': "+34954954954", 'allowed': true, 'job': "HIRED" };

        var dbMock = sinon.mock(Person);
        dbMock.expects('create').withArgs(personMocked).yields(null);

        chai.request(app)
            .post('/api/person')
            .send(person)
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body.person.name).to.equal("Juan")
                dbMock.verify();
                done();
            });
    });

    it('should return 500. Wrong data due to "allowed" field not present when mandatory', (done) => {
        var person = {'name': "Juan", 'surname': "Perez", 'email': "jperez@us.es", 'photo': "https://url.com/im.img", 'telf': "+34954954954", 'job': "HIRED"};
        var personMocked = {'name': "Juan", 'surname': "Perez", 'email': "jperez@us.es", 'photo': "https://url.com/im.img", 'telf': "+34954954954", 'job': "HIRED" };
        var dbMock = sinon.mock(Person);
        dbMock.expects('create').withArgs(personMocked).yields(true);

        chai.request(app)
            .post('/api/person')
            .send(person)
            .end((err, res) => {
                expect(res).to.have.status(500);
                dbMock.verify();
                done();
            });

    });
});

describe("**Get a person by id**", function() {

    it('should return a person', (done) => {
        var person = {
            "_id" : "5cefa10805b13e789525ce30",
            "urls" : [],
            "name" : "Alberto",
            "surname" : "Martin",
            "allowed" : false,
            "job" : "HIRED",
            "telf" : "954556356",
            "email" : "amarlop at us punto es",
            "photo" : "https://www.isa.us.es/2.0/assets/img/members/picture-1187068722.jpg",
            "__v" : 0
        }
        var dbMock = sinon.mock(Person)
        dbMock.expects('findById').withArgs("5cefa10805b13e789525ce30").yields(null,person);

        chai.request(app)
            .get('/api/person/5cefa10805b13e789525ce30')
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.person.name).to.equal("Alberto")
                dbMock.verify()
                done()
            })
    })

    it('should return a 500 code due to an internal server error', (done) => {
        var dbMock = sinon.mock(Person)
        dbMock.expects('findById').withArgs("5cefa10805b13e789525ce30").yields("error",null);

        chai.request(app)
            .get('/api/person/5cefa10805b13e789525ce30')
            .end((err, res) => {
                expect(res).to.have.status(500)
                dbMock.verify()
                done()
            })
    })

    it('should return 404 code due to there is no person with such id', (done) => {
        var dbMock = sinon.mock(Person)
        dbMock.expects('findById').withArgs("2").yields(null,null);

        chai.request(app)
            .get('/api/person/2')
            .end((err, res) => {
                expect(res).to.have.status(404)
                dbMock.verify()
                done()
            })
    })
})

describe("**Get several people**", function() {

    it('should return two people', (done) => {
        var persons = [{
            "_id" : "5cefa10805b13e789525ce30",
            "urls" : [],
            "name" : "Alberto",
            "surname" : "Martin",
            "allowed" : false,
            "job" : "HIRED",
            "telf" : "954556356",
            "email" : "amarlop at us punto es",
            "photo" : "https://www.isa.us.es/2.0/assets/img/members/picture-1187068722.jpg",
            "__v" : 0
        }, {
            "_id" : "5cefa10805b13e789525ce2f",
            "urls" : [],
            "name" : "Javier",
            "surname" : "Troya",
            "allowed" : true,
            "job" : "RESEARCHER",
            "office" : "F1.63",
            "scopusId" : "6602485427",
            "professionalStatus" : "RESEARCHER",
            "telf" : "954556973",
            "email" : "jtroya at us punto es",
            "photo" : "https://www.isa.us.es/2.0/assets/img/members/picture-60171131659.png",
            "active" : true,
            "__v" : 0
        }]
        var dbMock = sinon.mock(Person)
        dbMock.expects('find').withArgs().yields(null,persons);

        chai.request(app)
            .get('/api/persons')
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.persons[1].name).to.equal("Javier")
                dbMock.verify()
                done()
            })
    })

    it('should return a 500 code due to internal server error', (done) => {
        var dbMock = sinon.mock(Person)
        dbMock.expects('find').withArgs().yields("error",null);

        chai.request(app)
            .get('/api/persons')
            .end((err, res) => {
                expect(res).to.have.status(500)
                dbMock.verify()
                done()
            })
    })

    it('should a 404 code due to no people on the database', (done) => {
        var dbMock = sinon.mock(Person)
        dbMock.expects('find').withArgs().yields(null,null);

        chai.request(app)
            .get('/api/persons')
            .end((err, res) => {
                expect(res).to.have.status(404)
                dbMock.verify()
                done()
            })
    })
})

describe("**Update a person**", function() {

    it('should update the phone number', (done) => {
        var person = {
            "_id" : "5cefa10805b13e789525ce30",
            "urls" : [],
            "name" : "Alberto",
            "surname" : "Martin",
            "allowed" : false,
            "job" : "HIRED",
            "telf" : "954556356",
            "email" : "amarlop at us punto es",
            "photo" : "https://www.isa.us.es/2.0/assets/img/members/picture-1187068722.jpg",
            "__v" : 0
        }
        var phoneUpdated = {
            "_id" : "5cefa10805b13e789525ce30",
            "urls" : [],
            "name" : "Alberto",
            "surname" : "Martin",
            "allowed" : false,
            "job" : "HIRED",
            "telf" : "954954954",
            "email" : "amarlop at us punto es",
            "photo" : "https://www.isa.us.es/2.0/assets/img/members/picture-1187068722.jpg",
            "__v" : 0
        }
        var dbMock = sinon.mock(Person)
        dbMock.expects('findOneAndUpdate').withArgs("5cefa10805b13e789525ce30", phoneUpdated, {new: true}).yields(null,phoneUpdated);

        chai.request(app)
            .put('/api/person/5cefa10805b13e789525ce30')
            .send(phoneUpdated)
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.person.name).to.equal(person.name)
                expect(res.body.person.telf).to.not.equal(person.telf)
                expect(res.body.person.telf).to.equal("954954954")
                dbMock.verify()
                done()
            })
    })

    it('should return a 500 code due to internal server error', (done) => {
        var phoneUpdated = {
            "_id" : "5cefa10805b13e789525ce30",
            "urls" : [],
            "name" : "Alberto",
            "surname" : "Martin",
            "allowed" : false,
            "job" : "HIRED",
            "telf" : "954954954",
            "email" : "amarlop at us punto es",
            "photo" : "https://www.isa.us.es/2.0/assets/img/members/picture-1187068722.jpg",
            "__v" : 0
        }
        var dbMock = sinon.mock(Person)
        dbMock.expects('findOneAndUpdate').withArgs("5cefa10805b13e789525ce30", phoneUpdated, {new: true}).yields("error",null);

        chai.request(app)
            .put('/api/person/5cefa10805b13e789525ce30')
            .send(phoneUpdated)
            .end((err, res) => {
                expect(res).to.have.status(500)
                dbMock.verify()
                done()
            })
    })

    it('should return a 503 code due to not persond found with such id', (done) => {
        var phoneUpdated = {
            "_id" : "5cefa10805b13e789525ce30",
            "urls" : [],
            "name" : "Alberto",
            "surname" : "Martin",
            "allowed" : false,
            "job" : "HIRED",
            "telf" : "954954954",
            "email" : "amarlop at us punto es",
            "photo" : "https://www.isa.us.es/2.0/assets/img/members/picture-1187068722.jpg",
            "__v" : 0
        }
        var dbMock = sinon.mock(Person)
        dbMock.expects('findOneAndUpdate').withArgs("2", phoneUpdated, {new: true}).yields(null,null);

        chai.request(app)
            .put('/api/person/2')
            .send(phoneUpdated)
            .end((err, res) => {
                expect(res).to.have.status(503)
                dbMock.verify()
                done()
            })
    })
})

describe("**Delete a person by id**", function() {

    it('should return the person who has been deleted', (done) => {
        var person = {
            "_id" : "5cefa10805b13e789525ce30",
            "urls" : [],
            "name" : "Alberto",
            "surname" : "Martin",
            "allowed" : false,
            "job" : "HIRED",
            "telf" : "954556356",
            "email" : "amarlop at us punto es",
            "photo" : "https://www.isa.us.es/2.0/assets/img/members/picture-1187068722.jpg",
            "__v" : 0
        }
        var dbMock = sinon.mock(Person)
        dbMock.expects('findByIdAndDelete').withArgs("5cefa10805b13e789525ce30").yields(null,person);

        chai.request(app)
            .delete('/api/person/5cefa10805b13e789525ce30')
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.person.name).to.equal("Alberto")
                dbMock.verify()

                done()
            })
    })

    it('should return a 500 code due to internal server error', (done) => {
        var dbMock = sinon.mock(Person)
        dbMock.expects('findByIdAndDelete').withArgs("5cefa10805b13e789525ce30").yields("error",null);

        chai.request(app)
            .delete('/api/person/5cefa10805b13e789525ce30')
            .end((err, res) => {
                expect(res).to.have.status(500)
                dbMock.verify()
                done()
            })
    })

    it('should return a 503 code due to there is not a person with such id', (done) => {
        var dbMock = sinon.mock(Person)
        dbMock.expects('findByIdAndDelete').withArgs("2").yields(null,null);

        chai.request(app)
            .delete('/api/person/2')
            .end((err, res) => {
                expect(res).to.have.status(503)
                dbMock.verify()
                done()
            })
    })
})