'use strict' // Para usar cosas buenas de js
var mongoose = require('mongoose');
var Publication = require('../models/publication'); // Aporta el modelo y los metodos de la bd
var Project = require("../models/project");
var Person = require("../models/person")
var db = mongoose.connection;
var pubController = require("./publication");
// 200 -> OK, 201 -> Created, 400 -> Bad Request, 500 -> Internal Server Error, 503 -> Service Unavailable
var controller = {


	populate: function (req, res) { 
		Publication.deleteMany({}, () => {})
		Person.deleteMany({}, () => {})
		Project.deleteMany({}, () => {})

		//Persons
		var person1 = {
			name: "José Antonio", 
			surname: "Parejo", 
			allowed: true, 
			job: "RESEARCHER",
			office: "I0.71",
			scopusId: "24802465400",
			professionalStatus: "RESEARCHER",
			telf: "954556877",
			email: "japarejo at us punto es",
			photo: "https://www.isa.us.es/2.0/assets/img/members/picture-11995321950.jpg",
			active: true
		}
		var person2 = {
			name: "Carlos", 
			surname: "Müller", 
			allowed: true, 
			job: "RESEARCHER",
			office: "F0.43",
			scopusId: "55728096900",
			professionalStatus: "RESEARCHER",
			telf: "954553868",
			email: "cmuller at us punto es",
			photo: "https://www.isa.us.es/2.0/assets/img/members/picture-1378798236.jpg",
			active: true
		}
		var person3 = {
			name: "Adela", 
			surname: "del Rio", 
			allowed: true, 
			job: "RESEARCHER",
			office: "F0.54",
			scopusId: "22333640600",
			professionalStatus: "RESEARCHER",
			telf: "954559814",
			email: "adeladelrio at us punto es",
			photo: "https://www.isa.us.es/2.0/assets/img/members/picture-11384027785.jpg",
			active: true
		}
		var person4 = {
			name: "Manuel", 
			surname: "Resinas", 
			allowed: true, 
			job: "RESEARCHER",
			office: "F0.47",
			scopusId: "15021461000",
			professionalStatus: "RESEARCHER",
			telf: "954553867",
			email: "resinas at us punto es",
			photo: "https://www.isa.us.es/2.0/assets/img/members/picture-1265317244.jpg",
			active: true
		}
		var person5 = {
			name: "Javier", 
			surname: "Troya", 
			allowed: true, 
			job: "RESEARCHER",
			office: "F1.63",
			scopusId: "6602485427",
			professionalStatus: "RESEARCHER",
			telf: "954556973",
			email: "jtroya at us punto es",
			photo: "https://www.isa.us.es/2.0/assets/img/members/picture-60171131659.png",
			active: true
		}
		var person6 = {
			name: "Alberto",
			surname: "Martin",
			allowed: false,
			job: "HIRED",
			telf: "954556356",
			email: "amarlop at us punto es",
			photo: "https://www.isa.us.es/2.0/assets/img/members/picture-1187068722.jpg"
		}

		//Project
		var pro1 = {
			researchTeam : [person1],
			workTeam: [],
			hiredStaff: [],
			title: "Metamorphic testing of RESTful Web APIs",
			leader: person1,
			reference: "001",
			scope: "EUROPEO",
			status: "ACEPTADO",
			amount: 200000,
			relatedTools: [],
			startDate: new Date("2017-01-01"),
			endDate: new Date("2017-12-31")
		}
		var pro2 = {
			researchTeam : [person2, person4],
			workTeam: [],
			hiredStaff: [],
			title: "Automated Validation of Compensable SLAs",
			leader: person2,
			reference: "002",
			scope: "EUROPEO",
			status: "ACEPTADO",
			amount: 200000,
			relatedTools: [],
			startDate: new Date("2015-01-01"),
			endDate: new Date("2017-06-31")
		}
		var pro3 = {
			researchTeam : [person3],
			workTeam: [],
			hiredStaff: [],
			title: "Modeling variability in the video domain: language and experience report",
			leader: person3,
			reference: "003",
			scope: "EUROPEO",
			status: "ACEPTADO",
			amount: 200000,
			relatedTools: [],
			startDate: new Date("2019-01-01")
		}
		var pro4 = {
			researchTeam : [person4],
			workTeam: [],
			hiredStaff: [],
			title: "Visual ppinot: A Graphical Notation for Process Performance Indicators",
			leader: person4,
			reference: "004",
			scope: "EUROPEO",
			status: "ACEPTADO",
			amount: 200000,
			relatedTools: [],			
			startDate: new Date("2015-01-01")
		}
		var pro5 = {
			researchTeam : [person5],
			workTeam: [],
			hiredStaff: [],
			title: "On feeding business systems with linked resources from the web of data",
			leader: person5,
			reference: "005",
			scope: "EUROPEO",
			status: "ACEPTADO",
			amount: 200000,
			relatedTools: [],
			startDate: new Date("2017-09-01")
		}
		var pro6 = {
			researchTeam : [person5],
			workTeam: [],
			hiredStaff: [],
			title: "This is a test",
			leader: person5,
			reference: "006",
			scope: "EUROPEO",
			status: "ACEPTADO",
			amount: 200000,
			relatedTools: [],
			startDate: new Date("2015-01-01"),
			endDate: new Date("2015-03-03")
		}
		var pro7 = {
			researchTeam : [person2, person4],
			workTeam: [],
			hiredStaff: [],
			title: "This is another test",
			leader: person2,
			reference: "007",
			scope: "EUROPEO",
			status: "ACEPTADO",
			amount: 200000,
			relatedTools: [],
			startDate: new Date("2015-01-01"),
			endDate: new Date("2017-04-31")
		}
		const createPerson = Person.create([person1,person2,person3,person4,person5,person6])
		
		const createProject = Project.create([pro1, pro2, pro3, pro4, pro5, pro6, pro7])
		const createPublication = data => {
			var pub1 = {
				scopusId: "SCOPUS_ID:85032230617",
				articleTitle: "Metamorphic testing of RESTful Web APIs",
				sourceType: "Journal",
				documentType: "Article",
				sourceTitle: "IEEE Transactions on Software Engineering",
				pageRange: "1083-1099",
				publicationDate: "2018",
				DOI: "10.1109/TSE.2017.2764464",
				authors : [person1],
				affiliation: "Universidad de Sevilla",
				project: [data[0]],
				assigned: true
			}
			var pub2 = {
				scopusId: "SCOPUS_ID:85058151934",
				articleTitle: "Automated Validation of Compensable SLAs",
				sourceType: "Journal",
				documentType: "Article in Press",
				sourceTitle: "IEEE Transactions on Software Engineering",
				pageRange: "",
				publicationDate: "2018",
				DOI: "10.1109/TSC.2018.2885766",
				authors : [person2, person4],
				affiliation: "Universidad de Sevilla",
				project: [data[1]],
				assigned: true
			}
			var pub3 = {
				scopusId: "SCOPUS_ID:85043359422",
				articleTitle: "Modeling variability in the video domain: language and experience report",
				sourceType: "Journal",
				documentType: "Article",
				sourceTitle: "Software Quality Journal",
				pageRange: "307-347",
				publicationDate: "2019",
				DOI: "10.1007/s11219-017-9400-8",
				authors : [person3],
				affiliation: "Universidad de Sevilla",
				project: [data[2]],
				assigned: true
			}
			var pub4 = {
				scopusId: "SCOPUS_ID:85055826554",
				articleTitle: "Visual ppinot: A Graphical Notation for Process Performance Indicators",
				sourceType: "Journal",
				documentType: "Article",
				sourceTitle: "Business and Information Systems Engineering",
				pageRange: "137-161",
				publicationDate: "2019",
				DOI: "10.1007/s12599-017-0483-3",
				authors : [person4],
				affiliation: "Universidad de Sevilla",
				project: [data[3]],
				assigned: true
			}
			var pub5 = {
				scopusId: "SCOPUS_ID:85050644470",
				articleTitle: "On feeding business systems with linked resources from the web of data",
				sourceType: "Book",
				documentType: "Conference Paper",
				sourceTitle: "Lecture Notes in Business Information Processing",
				pageRange: "307-320",
				publicationDate: "2018",
				DOI: "10.1007/978-3-319-93931-5_22",
				authors : [person5],
				affiliation: "Universidad de Sevilla",
				project: [data[4],data[2]],
				assigned: true
			}
	
			return pubController.saveAll([pub1, pub2, pub3, pub4, pub5])
		}
		createProject.then(createPublication).then(createPerson).then(() => {
			return res.status(201).send({});
		}).catch(err => {
			return res.status(500).send({ message_es: "Error en el populado", message_en: "Error in the request", message_data: err });
		})

	}

	
};

module.exports = controller;
