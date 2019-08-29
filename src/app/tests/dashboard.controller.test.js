const app = require('../../../app');

const chai = require("chai");
const expect = chai.expect
const chai_http = require("chai-http");
const sinon = require("sinon");
var Person = require('../../../models/person');
var Publication = require('../../../models/publication'); // Aporta el modelo y los metodos de la bd
var Project = require("../../../models/project");

chai.use(chai_http);

xdescribe("**Populating**", function () {

    it('should populate', (done) => {
        var projectMock = sinon.mock(Project);
        var pubMock = sinon.mock(Publication);
        var personMock = sinon.mock(Person);

        var persons = [{
			'name': "José Antonio", 
			'surname': "Parejo", 
			'allowed': true, 
			'job': "RESEARCHER",
			'office': "I0.71",
			'scopusId': "24802465400",
			'professionalStatus': "RESEARCHER",
			'telf': "954556877",
			'email': "japarejo at us punto es",
			'photo': "https://www.isa.us.es/2.0/assets/img/members/picture-11995321950.jpg",
			'active': true
		},
		{
			'name': "Carlos", 
			'surname': "Müller", 
			'allowed': true, 
			'job': "RESEARCHER",
			'office': "F0.43",
			'scopusId': "55728096900",
			'professionalStatus': "RESEARCHER",
			'telf': "954553868",
			'email': "cmuller at us punto es",
			'photo': "https://www.isa.us.es/2.0/assets/img/members/picture-1378798236.jpg",
			'active': true
		},
		{
			'name': "Adela", 
			'surname': "del Rio", 
			'allowed': true, 
			'job': "RESEARCHER",
			'office': "F0.54",
			'scopusId': "22333640600",
			'professionalStatus': "RESEARCHER",
			'telf': "954559814",
			'email': "adeladelrio at us punto es",
			'photo': "https://www.isa.us.es/2.0/assets/img/members/picture-11384027785.jpg",
			'active': true
		},
		{
			'name': "Manuel", 
			'surname': "Resinas", 
			'allowed': true, 
			'job': "RESEARCHER",
			'office': "F0.47",
			'scopusId': "15021461000",
			'professionalStatus': "RESEARCHER",
			'telf': "954553867",
			'email': "resinas at us punto es",
			'photo': "https://www.isa.us.es/2.0/assets/img/members/picture-1265317244.jpg",
			'active': true
		},
		{
			'name': "Javier", 
			'surname': "Troya", 
			'allowed': true, 
			'job': "RESEARCHER",
			'office': "F1.63",
			'scopusId': "6602485427",
			'professionalStatus': "RESEARCHER",
			'telf': "954556973",
			'email': "jtroya at us punto es",
			'photo': "https://www.isa.us.es/2.0/assets/img/members/picture-60171131659.png",
			'active': true
		},
		{
			'name': "Alberto",
			'surname': "Martin",
			'allowed': false,
			'job': "HIRED",
			'telf': "954556356",
			'email': "amarlop at us punto es",
			'photo': "https://www.isa.us.es/2.0/assets/img/members/picture-1187068722.jpg"
        }]
        
        var projects = [
            {
                'researchTeam' : [persons[0]],
                'workTeam': [],
                'hiredStaff': [],
                'title': "Metamorphic testing of RESTful Web APIs",
                'leader': persons[0],
                'reference': "001",
                'scope': "EUROPEO",
                'status': "ACEPTADO",
                'amount': 200000,
                'relatedTools': [],
                'startDate': new Date("2017-01-01"),
                'endDate': new Date("2017-12-31")
            },
            {
                'researchTeam' : [persons[1], persons[3]],
                'workTeam': [],
                'hiredStaff': [],
                'title': "Automated Validation of Compensable SLAs",
                'leader': persons[1],
                'reference': "002",
                'scope': "EUROPEO",
                'status': "ACEPTADO",
                'amount': 200000,
                'relatedTools': [],
                'startDate': new Date("2015-01-01"),
                'endDate': new Date("2017-06-31")
            },
            {
                'researchTeam' : [persons[2]],
                'workTeam': [],
                'hiredStaff': [],
                'title': "Modeling variability in the video domain: language and experience report",
                'leader': persons[2],
                'reference': "003",
                'scope': "EUROPEO",
                'status': "ACEPTADO",
                'amount': 200000,
                'relatedTools': [],
                'startDate': new Date("2019-01-01")
            },
            {
                'researchTeam' : [persons[3]],
                'workTeam': [],
                'hiredStaff': [],
                'title': "Visual ppinot: A Graphical Notation for Process Performance Indicators",
                'leader': persons[3],
                'reference': "004",
                'scope': "EUROPEO",
                'status': "ACEPTADO",
                'amount': 200000,
                'relatedTools': [],			
                'startDate': new Date("2015-01-01")
            },
            {
                'researchTeam' : [persons[4]],
                'workTeam': [],
                'hiredStaff': [],
                'title': "On feeding business systems with linked resources from the web of data",
                'leader': persons[4],
                'reference': "005",
                'scope': "EUROPEO",
                'status': "ACEPTADO",
                'amount': 200000,
                'relatedTools': [],
                'startDate': new Date("2017-09-01")
            }
        ]

        projectMock.expects('create').withArgs(projects).resolves([]);
        personMock.expects('create').withArgs(persons).yields(null);
        pubMock.expects('create').atLeast(1);
        chai.request(app)
            .post('/api/populate')
            .send()
            .end((err, res) => {
                expect(res).to.have.status(200);
                personMock.verify();
                pubMock.verify();
                projectMock.verify();
                done();
            });
    });

    it('should return error 500. Publication fails', (done) => {
        var pubMock = sinon.mock(Publication);
        pubMock.expects('create').withArgs(null).yields(false);

        chai.request(app)
            .post('/api/populate')
            .send()
            .end((err, res) => {
                expect(res).to.have.status(500);
                pubMock.verify();
                done();
            });

    });
});