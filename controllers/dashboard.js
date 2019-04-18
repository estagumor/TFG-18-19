'use strict' // Para usar cosas buenas de js
var mongoose = require('mongoose');
var Publication = require('../models/publication'); // Aporta el modelo y los metodos de la bd
var Project = require("../models/project");
var Person = require("../models/person")
var db = mongoose.connection;
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
			active: true
		}
		var person3 = {
			name: "David", 
			surname: "Benavides", 
			allowed: true, 
			job: "RESEARCHER",
			office: "F0.48",
			scopusId: "22333640600",
			professionalStatus: "RESEARCHER",
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
			active: true
		}
		var person5 = {
			name: "Rafael", 
			surname: "Corchuelo", 
			allowed: true, 
			job: "RESEARCHER",
			office: "F1.63",
			scopusId: "6602485427",
			professionalStatus: "RESEARCHER",
			active: true
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
			relatedTools: []
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
			relatedTools: []
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
			relatedTools: []
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
			relatedTools: []
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
			relatedTools: []
		}

		const createPerson = Person.create([person1,person2,person3,person4,person5])
		const createProject = Project.create([pro1, pro2, pro3, pro4, pro5]).then((err2, response2) => {
			return Promise.resolve(response2)
		})
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
				project: data[0],
				assigned: true
			}
			var pub2 = {
				scopusId: "SCOPUS_ID:85058151934",
				articleTitle: "Automated Validation of Compensable SLAs",
				sourceType: "Journal",
				documentType: "Article in Press",
				sourceTitle: "IEEE Transactions on Services Computing",
				pageRange: "",
				publicationDate: "2018",
				DOI: "10.1109/TSC.2018.2885766",
				authors : [person2, person4],
				affiliation: "Universidad de Sevilla",
				project: data[1],
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
				project: data[2],
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
				project: data[3],
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
				project: data[4],
				assigned: true
			}
	
			Publication.create([pub1, pub2, pub3, pub4, pub5])
		}
		createPerson.then(createProject).then(createPublication).then(() => {
			return res.status(201).send({});
		}).catch(err => {
			return res.status(500).send({ message_es: "Error en el populado", message_en: "Error in the request", message_data: err });
		})
		// if(err)
				// 	return res.status(500).send({ message_es: "Error guardando las publicaciones", message_en: "Error in the request", message_data: err });
				// return res.status(201).send({});

		var projects
		// Person.create([person1,person2,person3,person4,person5])
		// .then((err, response) => {
		// 	Project.create([pro1, pro2, pro3, pro4, pro5]).then((err2, response2) => {
		// 		projects = response2
		// 	}).then((err3,response3) => {
		// 		var pub1 = {
		// 			scopusId: "SCOPUS_ID:85032230617",
		// 			articleTitle: "Metamorphic testing of RESTful Web APIs",
		// 			sourceType: "Journal",
		// 			documentType: "Article",
		// 			sourceTitle: "IEEE Transactions on Software Engineering",
		// 			pageRange: "1083-1099",
		// 			publicationDate: "2018",
		// 			DOI: "10.1109/TSE.2017.2764464",
		// 			authors : [person1],
		// 			affiliation: "Universidad de Sevilla",
		// 			project: projects[0],
		// 			assigned: true
		// 		}
		// 		var pub2 = {
		// 			scopusId: "SCOPUS_ID:85058151934",
		// 			articleTitle: "Automated Validation of Compensable SLAs",
		// 			sourceType: "Journal",
		// 			documentType: "Article in Press",
		// 			sourceTitle: "IEEE Transactions on Services Computing",
		// 			pageRange: "",
		// 			publicationDate: "2018",
		// 			DOI: "10.1109/TSC.2018.2885766",
		// 			authors : [person2, person4],
		// 			affiliation: "Universidad de Sevilla",
		// 			project: projects[1],
		// 			assigned: true
		// 		}
		// 		var pub3 = {
		// 			scopusId: "SCOPUS_ID:85043359422",
		// 			articleTitle: "Modeling variability in the video domain: language and experience report",
		// 			sourceType: "Journal",
		// 			documentType: "Article",
		// 			sourceTitle: "Software Quality Journal",
		// 			pageRange: "307-347",
		// 			publicationDate: "2019",
		// 			DOI: "10.1007/s11219-017-9400-8",
		// 			authors : [person3],
		// 			affiliation: "Universidad de Sevilla",
		// 			project: projects[2],
		// 			assigned: true
		// 		}
		// 		var pub4 = {
		// 			scopusId: "SCOPUS_ID:85055826554",
		// 			articleTitle: "Visual ppinot: A Graphical Notation for Process Performance Indicators",
		// 			sourceType: "Journal",
		// 			documentType: "Article",
		// 			sourceTitle: "Business and Information Systems Engineering",
		// 			pageRange: "137-161",
		// 			publicationDate: "2019",
		// 			DOI: "10.1007/s12599-017-0483-3",
		// 			authors : [person4],
		// 			affiliation: "Universidad de Sevilla",
		// 			project: projects[3],
		// 			assigned: true
		// 		}
		// 		var pub5 = {
		// 			scopusId: "SCOPUS_ID:85050644470",
		// 			articleTitle: "On feeding business systems with linked resources from the web of data",
		// 			sourceType: "Book series",
		// 			documentType: "Conference Paper",
		// 			sourceTitle: "Lecture Notes in Business Information Processing",
		// 			pageRange: "307-320",
		// 			publicationDate: "2018",
		// 			DOI: "10.1007/978-3-319-93931-5_22",
		// 			authors : [person5],
		// 			affiliation: "Universidad de Sevilla",
		// 			project: projects[4],
		// 			assigned: true
		// 		}
		
		// 		Publication.create([pub1, pub2, pub3, pub4, pub5], (err, response) => {
		// 			if(err)
		// 				return res.status(500).send({ message_es: "Error guardando las publicaciones", message_en: "Error in the request", message_data: err });
		// 			return res.status(201).send({});
		// 		})
		// 	})
		// })

		//Publications
		

		

	}

	
};

module.exports = controller;
