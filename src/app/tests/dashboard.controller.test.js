const app = require('../../../app');

const chai = require("chai");
const expect = chai.expect
const chai_http = require("chai-http");
const sinon = require("sinon");
var Person = require('../../../models/person');
var Publication = require('../../../models/publication'); // Aporta el modelo y los metodos de la bd
var Project = require("../../../models/project");

chai.use(chai_http);

describe("**Populating**", function () {

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
                'startDate': new Date("Sun Jan 01 2017 01:00:00 GMT+0100 (GMT+01:00)"), 
                'endDate': new Date("Sun Dec 31 2017 01:00:00 GMT+0100 (GMT+01:00)"),
            },
            {
                'researchTeam' : [persons[1], {
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
                }],
                'workTeam': [],
                'hiredStaff': [],
                'title': "Automated Validation of Compensable SLAs",
                'leader': persons[1],
                'reference': "002",
                'scope': "EUROPEO",
                'status': "ACEPTADO",
                'amount': 200000,
                'relatedTools': [],
                'startDate': new Date("Thu Jan 01 2015 01:00:00 GMT+0100 (GMT+01:00)"),
                'endDate': new Date("Sat Jul 01 2017 02:00:00 GMT+0200 (GMT+02:00)")
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
                'startDate': new Date("Tue Jan 01 2019 01:00:00 GMT+0100 (GMT+01:00)")
            },
            {
                'researchTeam' : [{
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
                }],
                'workTeam': [],
                'hiredStaff': [],
                'title': "Visual ppinot: A Graphical Notation for Process Performance Indicators",
                'leader': persons[3],
                'reference': "004",
                'scope': "EUROPEO",
                'status': "ACEPTADO",
                'amount': 200000,
                'relatedTools': [],			
                'startDate': new Date("Thu Jan 01 2015 01:00:00 GMT+0100 (GMT+01:00)")
            },
            {
                'researchTeam' : [{
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
                }],
                'workTeam': [],
                'hiredStaff': [],
                'title': "On feeding business systems with linked resources from the web of data",
                'leader': persons[4],
                'reference': "005",
                'scope': "EUROPEO",
                'status': "ACEPTADO",
                'amount': 200000,
                'relatedTools': [],
                'startDate': new Date("Fri Sep 01 2017 02:00:00 GMT+0200 (GMT+02:00)")
            }
        ]

        var publications = [{
            scopusId: "SCOPUS_ID:85032230617",
            quartil: "Q1",
            articleTitle: "Metamorphic testing of RESTful Web APIs",
            sourceType: "Journal",
            documentType: "Article",
            sourceTitle: "IEEE Transactions on Software Engineering",
            pageRange: "1083-1099",
            publicationDate: "2018",
            DOI: "10.1109/TSE.2017.2764464",
            authors : [{
                active: true,
                allowed: true,
                email: "japarejo at us punto es",
                job: "RESEARCHER",
                name: "José Antonio",
                office: "I0.71",
                photo: "https://www.isa.us.es/2.0/assets/img/members/picture-11995321950.jpg",
                professionalStatus: "RESEARCHER",
                scopusId: "24802465400",
                surname: "Parejo",
                telf: "954556877"
              }],
            affiliation: "Universidad de Sevilla",
            project: [projects[0]],
            assigned: true
        }, {
            scopusId: "SCOPUS_ID:85058151934",
            quartil: "Q1",
            articleTitle: "Automated Validation of Compensable SLAs",
            sourceType: "Journal",
            documentType: "Article in Press",
            sourceTitle: "IEEE Transactions on Software Engineering",
            pageRange: "",
            publicationDate: "2018",
            DOI: "10.1109/TSC.2018.2885766",
            authors : [persons[1], persons[3]],
            affiliation: "Universidad de Sevilla",
            project: [projects[1]],
            assigned: true
        },
        {
            scopusId: "SCOPUS_ID:85043359422",
            articleTitle: "Modeling variability in the video domain: language and experience report",
            sourceType: "Journal",
            documentType: "Article",
            sourceTitle: "Software Quality Journal",
            pageRange: "307-347",
            publicationDate: "2019",
            quartil: "Q2",
            DOI: "10.1007/s11219-017-9400-8",
            authors : [persons[2]],
            affiliation: "Universidad de Sevilla",
            project: [projects[2]],
            assigned: true
        },
        {
            scopusId: "SCOPUS_ID:85055826554",
            articleTitle: "Visual ppinot: A Graphical Notation for Process Performance Indicators",
            sourceType: "Journal",
            documentType: "Article",
            quartil: undefined,
            sourceTitle: "Business and Information Systems Engineering",
            pageRange: "137-161",
            publicationDate: "2019",
            DOI: "10.1007/s12599-017-0483-3",
            authors : [persons[3]],
            affiliation: "Universidad de Sevilla",
            project: [projects[3]],
            assigned: true
        },
        {
            scopusId: "SCOPUS_ID:85050644470",
            articleTitle: "On feeding business systems with linked resources from the web of data",
            sourceType: "Book",
            documentType: "Conference Paper",
            sourceTitle: "Lecture Notes in Business Information Processing",
            pageRange: "307-320",
            publicationDate: "2018",
            DOI: "10.1007/978-3-319-93931-5_22",
            authors : [persons[4]],
            affiliation: "Universidad de Sevilla",
            project: [projects[4],projects[2]],
            assigned: true
        }]

        pubMock.expects('deleteMany').withArgs().yields();
        personMock.expects('deleteMany').withArgs().yields();
        projectMock.expects('deleteMany').withArgs().yields();

        projectMock.expects('create').withArgs(projects).resolves(projects);
        pubMock.expects('create').withArgs(publications).resolves(publications);
        personMock.expects('create').withArgs(persons).resolves(persons);
        
        chai.request(app)
            .get('/api/populate')
            .send()
            .end((err, res) => {
                expect(res).to.have.status(201);
                personMock.verify();
                pubMock.verify();
                projectMock.verify();
                done();
            });
    });
});