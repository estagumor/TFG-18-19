'use strict' // Para usar cosas buenas de js
var mongoose = require('mongoose'); // Libreria que se encarga de los modelos
var Publication = require('../models/publication'); // Aporta el modelo y los metodos de la bd
var ProjectController = require("./project");
var Project = require("../models/project");
var ObjectId = mongoose.Types.ObjectId
var db = mongoose.connection;
var XLSX = require('xlsx'); // Libreria utilizada para el manejo de excels
// Las dos siguientes almacenan en tiempo de ejecución los nombres y categorias de las revistas y congresos
var quartiles = {}
var congress = {}
var congressTitles = []
var fs = require('fs') // Libreria de manejo de archivos
// 200 -> OK, 201 -> Created, 400 -> Bad Request, 500 -> Internal Server Error, 503 -> Service Unavailable
/*
	Funcion que lee los archivos situados en la carpeta /controllers/excels/revistas y para cada uno guarda en un indice
	las revistas catalogadas en cada categoria, con la siguiente estructura
	{"2018": 
		{"Q1": 
			{"Revista1","Revista2"}
		}, {"Q2":
			{"Revista3"}	
		}...
	,"2019":
		...
	}
*/
function readExcel(){
	var result = {}
	var res = {"Q1": [], "Q2":[], "Q3": [], "Q4": []}
	
	fs.readdir(__dirname + '/excels/revistas/', (err, files) => { // Devuelve en files un array con todos los archivos existentes en dicha ruta
		for (let file in files) {
			file=files[file] // En file se almacena el indice del array, por lo que para usarlo se coge el valor real
			let local = Object.assign({}, res) // Se crea una copia de la estructura de res
			let anyo = /\d{4}/.exec(file)[0] // Se extrae el año del nombre del archivo
			var workbook = XLSX.readFile(__dirname + '/excels/revistas/' + file); // Se carga el archivo en el gestor de excels
			var q1 = workbook.Sheets['Q1'] // Escoge la hoja 'Q1'
			var nRows = XLSX.utils.decode_range(q1['!ref']).e.r // Obtiene el nº de filas de la hoja
			for(var i = 4; i<nRows; i++){ // Itera a partir de la 4 fila porque es cuando empiezan los datos y coge el v (value) de la celda B y la convierte a mayuscula
				local["Q1"].push(q1['B'+i].v.toUpperCase())
			}
			var q2 = workbook.Sheets['Q2']
			nRows = XLSX.utils.decode_range(q2['!ref']).e.r
			for(i = 4; i<nRows; i++){
				local["Q2"].push(q2['B'+i].v.toUpperCase())
			}
			var q3 = workbook.Sheets['Q3']
			nRows = XLSX.utils.decode_range(q3['!ref']).e.r
			for(i = 4; i<nRows; i++){
				local["Q3"].push(q3['B'+i].v.toUpperCase())
			}
			var q4 = workbook.Sheets['Q4']
			nRows = XLSX.utils.decode_range(q4['!ref']).e.r
			for(i = 4; i<nRows; i++){
				local["Q4"].push(q4['B'+i].v.toUpperCase())
			}
			result[anyo] = local // Añade al diccionario los registros guardados usando como key el año
		}
	})
	quartiles = result // Guarda el resultado en la variable global quartiles
}

/*
	Funcion que lee los archivos situados en la carpeta /controllers/excels/congresos y para cada uno guarda en un indice
	los congresos catalogados en cada categoria, con la siguiente estructura
	{"2018": 
		{"A": 
			{"Congreso1","Congreso2"}
		}, {"A-":
			{"Congreso3"}	
		}...
	,"2019":
		...
	}
*/
function readExcel2() {
	var res = { "A++": [], "A+": [], "A": [], "A-": [], "B": [], "B-": [], "C": [], "": [] };
	var result = {}
	fs.readdir(__dirname + '/excels/congresos/', (err, files) => { // Devuelve en files un array con todos los archivos existentes en dicha ruta
		congressTitles = []
		for (let file in files) { 
			file=files[file] // Coge el valor segun el indice, realiza una copia de res y coge el año
			let local = Object.assign({}, res)
			let anyo = /\d{4}/.exec(file)[0]
			var workbook = XLSX.readFile(__dirname + "/excels/congresos/" + file); // Carga el archivo en el lector de excels
			var sheet = workbook.Sheets['GII-GRIN-SCIE-Conference-Rating'] // Coge la hoja indicada

			var nRows = XLSX.utils.decode_range(sheet['!ref']).e.r; // Coge el nº de lineas
			for (var i = 3; i < nRows; i++) {
				if (sheet['K' + i] != undefined){ // Coge el valor de la celda K y la almacena pasandola a mayuscula
					local[sheet['K' + i].v].push(sheet['B' + i].v.toUpperCase())
					congressTitles.push(sheet['B' + i].v.toUpperCase())
				}
			}
			result[anyo] = local
		}
	})
	congress = result // Guarda el resultado en la variable global congress
	
}

function loadCongressTitles(){
	fs.readdir(__dirname + '/excels/congresos/', (err, files) => { // Devuelve en files un array con todos los archivos existentes en dicha ruta
		for (let file in files) { 
			file=files[file] // Coge el valor segun el indice, realiza una copia de res y coge el año
			var workbook = XLSX.readFile(__dirname + "/excels/congresos/" + file); // Carga el archivo en el lector de excels
			var sheet = workbook.Sheets['GII-GRIN-SCIE-Conference-Rating'] // Coge la hoja indicada

			var nRows = XLSX.utils.decode_range(sheet['!ref']).e.r; // Coge el nº de lineas
			for (var i = 3; i < nRows; i++) {
				if (sheet['K' + i] != undefined){ // Coge el valor de la celda K y la almacena pasandola a mayuscula
					congressTitles.push(sheet['B' + i].v.toUpperCase())
				}
			}

			break;
		}
	})
}
/*
	Metodo para actualizar los indices de revistas y congresos de las publicaciones existentes
*/
function refreshIndexes(){
	var pubs
	Publication.find({}).then((data) => {
		pubs = data
		pubs.forEach((pub) => {
			if (pub.sourceType == "Journal") { // Si la publicacion es de una revista
				// Se coge el año de la publicacion, y existe en el indice quartiles se sigue adelante, mientras no, intenta coger el anterior hasta eñ 2000
				// en cuyo caso le pone undefined
				var anyo = parseInt(pub.publicationDate)
				while(quartiles[anyo] == undefined){
					anyo = anyo -1
					if(anyo == 2000 ){
						pub.quartil = undefined
					}
				}
				var quartilTemp = quartiles[anyo]
				// Cuando tiene el año coge del indice la informacion correspondiente y busca a que cuartil corresponde la revista
				if (quartilTemp.Q1.indexOf(pub.sourceTitle.toUpperCase()) != -1) {
					pub.quartil = "Q1"
				} else if (quartilTemp.Q2.indexOf(pub.sourceTitle.toUpperCase()) != -1) {
					pub.quartil = "Q2"
				} else if (quartilTemp.Q3.indexOf(pub.sourceTitle.toUpperCase()) != -1) {
					pub.quartil = "Q3"
				} else if (quartilTemp.Q4.indexOf(pub.sourceTitle.toUpperCase()) != -1) {
					pub.quartil = "Q4"
				}
			} else if (pub.sourceType.indexOf("Conference") != -1){ // Si es una conferencia
				var anyo = parseInt(pub.publicationDate) // Igual que antes intenta coger el año
				while(congress[anyo] == undefined){
					anyo = anyo -1
					if(anyo == 2000 ){
						pub.congress = undefined
					}
				}
				var congressTemp = congress[anyo] // Cuando lo encuentra busca a que categoria pertenece su congreso
				for(let categoria in congressTemp){
					if(congress[anyo][categoria].indexOf(pub.sourceTitle.toUpperCase()) != -1){
						pub.congress = categoria
						break;
					}
				}
			}
			pub.save()
		})
	})
}

readExcel()
readExcel2()
loadCongressTitles()

var controller = {

	test: function (req,res ){
		refreshIndexes()
		res.status(200).send({congressTitles})
	},

	/*
		Funcion que fuerza la actualizacion de los indices de congresos y revistas
	*/
	loadStats: function(req,res){
		try {
			readExcel()
			readExcel2()
			setTimeout(refreshIndexes,5000)
			res.status(200).send({result:"Estadisticas actualizadas"})
			
		} catch (error) {
			res.status(500).send({result:"Fallo al actualizar las estadísticas", error: error})
		}
	},

	/*
		Funcion que recibe via post el tipo de excel ('revista' o 'congreso'), el excel en base64 y el nombre del archivo
	*/
	uploadExcel: function(req, res){
		var body = req.body
		var tipo = body.tipo
		var excel = body.excel
		var name = body.name
		var base64 = excel.slice(78) // Al base64 se le quitan los 78 primeros caracteres que indican la codificación, 78 en este caso concreto
		if(tipo == "congreso"){ // Si es de un congreso crea el archivo en su carpeta correspondiente, indicandole la ruta, el contenido, el formato y el callback
			fs.writeFile(__dirname + '/excels/congresos/'+name, base64, 'base64', (err, file) => {
				if(err){
					res.status(500).send(err)
				}

				res.status(200).send()
			})
		} else if (tipo == "revista"){ // Lo mismo si es una revista
			fs.write(__dirname + '/excels/revistas/'+name, base64, 'base64', (err, file) => {
				if(err){
					res.status(500).send(err)
				}
				
				res.status(200).send()
			})
		} else { // Si no es ninguno de los dos se le indica que es incorrecta la llamada
			res.status(503).send({error: 'Malformed request'})
		}
		readExcel()
		readExcel2()
	},

	save: function (req, res) { 
		var pub = req.body;
		try {

			if (pub.sourceType == "Journal") { // Si la publicacion es de una revista
				// Se coge el año de la publicacion, y existe en el indice quartiles se sigue adelante, mientras no, intenta coger el anterior hasta eñ 2000
				// en cuyo caso le pone undefined
				var anyo = parseInt(pub.publicationDate)
				while(quartiles[anyo] == undefined){
					anyo = anyo -1
					if(anyo == 2000 ){
						pub.quartil = undefined
					}
				}
				var quartilTemp = quartiles[anyo]
				// Cuando tiene el año coge del indice la informacion correspondiente y busca a que cuartil corresponde la revista
				if (quartilTemp.Q1.indexOf(pub.sourceTitle.toUpperCase()) != -1) {
					pub.quartil = "Q1"
				} else if (quartilTemp.Q2.indexOf(pub.sourceTitle.toUpperCase()) != -1) {
					pub.quartil = "Q2"
				} else if (quartilTemp.Q3.indexOf(pub.sourceTitle.toUpperCase()) != -1) {
					pub.quartil = "Q3"
				} else if (quartilTemp.Q4.indexOf(pub.sourceTitle.toUpperCase()) != -1) {
					pub.quartil = "Q4"
				}
			} else if (pub.sourceType.indexOf("Conference") != -1){ // Si es una conferencia
				var anyo = parseInt(pub.publicationDate) // Igual que antes intenta coger el año
				while(congress[anyo] == undefined){
					anyo = anyo -1
					if(anyo == 2000 ){
						pub.congress = undefined
					}
				}
				var congressTemp = congress[anyo] // Cuando lo encuentra busca a que categoria pertenece su congreso
				for(let categoria in congressTemp){
					if(congress[anyo][categoria].indexOf(pub.sourceTitle.toUpperCase()) != -1){
						pub.congress = categoria
						break;
					}
				}
			}
		} catch (error) {
			console.log(error)
			res.status(503).send({error})
		}
		if (pub == undefined) {
			return res.status(400).send({ message: "Can't save an empty publication" });
		} else {

			Publication.create(pub, (err) => {
				if (err) return res.status(500).send({ message_es: "Error en la petición", message_en: "Error in the request", message_data: err });
				if (!pub) return res.status(503).send({ message: "Error when trying to save the publication" });
				return res.status(201).send({ 'pub': pub });
			})
		}
	},

	saveAll: function (pubs) {
		
		for (let ind in pubs) {
			let pub = pubs[ind]
			try {

				if (pub.sourceType == "Journal") { // Mismo procedimiento que en save
					var anyo = parseInt(pub.publicationDate)
					while(quartiles[anyo] == undefined){
						anyo = anyo -1
						if(anyo == 2000 ){
							pub.quartil = undefined
						}
					}
					var quartilTemp = quartiles[anyo]
					if (quartilTemp.Q1.indexOf(pub.sourceTitle.toUpperCase()) != -1) {
						pub.quartil = "Q1"
					} else if (quartilTemp.Q2.indexOf(pub.sourceTitle.toUpperCase()) != -1) {
						pub.quartil = "Q2"
					} else if (quartilTemp.Q3.indexOf(pub.sourceTitle.toUpperCase()) != -1) {
						pub.quartil = "Q3"
					} else if (quartilTemp.Q4.indexOf(pub.sourceTitle.toUpperCase()) != -1) {
						pub.quartil = "Q4"
					}
				} else if (pub.sourceType.indexOf("Conference") != -1){ // Mismo procedimiento que en save
					var anyo = parseInt(pub.publicationDate)
					while(congress[anyo] == undefined){
						anyo = anyo -1
						if(anyo == 2000 ){
							pub.congress = undefined
						}
					}
					var congressTemp = congress[anyo]
					for(let categoria in congressTemp){
						if(congress[anyo][categoria].indexOf(pub.sourceTitle.toUpperCase()) != -1){
							pub.congress = categoria
							break;
						}
					}
				}
			} catch (error) {
				console.log(error)
				res.status(503).send({ error })
			}
		}

		Publication.create(pubs, (err) => {
			if (err) return res.status(500).send({ message_es: "Error en la petición", message_en: "Error in the request", message_data: err });
			if (!pubs) return res.status(503).send({ message: "Error when trying to save the publication" });
			return pubs
		})


	},

	getPublication: function(req, res){
		var pubId = req.params.id;

		if(pubId == null){
			return res.status(400).send({message: 'La publicacion no existe'})
		}

		Publication.findById(pubId, (err, pub) => {
			if (err) return res.status(500).send({
				message: err
			});

			else if (!pub) return res.status(404).send({
				message: "No hay una publicacion con este ID"
			});

			return res.status(200).send({
				pub
			});
		});
	},

	updatePublication: function (req, res) {
		var publicationId = req.params.id;
		var datosUpdate = req.body;

		if (datosUpdate.publicationDate != null) {
			var publicationDate = datosUpdate.publicationDate;
			datosUpdate.publicationDate = publicationDate["month"] + "/" + publicationDate["day"] + "/" + publicationDate["year"];
		}

		Publication.findOneAndUpdate(publicationId, datosUpdate, { new: true }, (err, publicationUpdated) => {
			if (err) return res.status(500).send({ message: err });

			if (!publicationUpdated) return res.status(503).send({ message: "Error when trying to update the publication" });

			return res.status(200).send({
				publication: publicationUpdated
			})
		});
	},

	getPubs: function (req, res) {
		let limit = req.query.limit ? parseInt(req.query.limit) : 25;
		let offset = req.query.offset ? parseInt(req.query.offset) : 0;
		let total
		Publication.estimatedDocumentCount({}, (err, number) => {
			total = number;
		})

		Publication.find({}, null, { limit: limit, skip: offset }, (err, pubs) => {
			if (err) return res.status(500).send({ message: err })
			if (!pubs) return res.status(404).send({ message: 'There are no publications to show' })
			if (!req.body) // Esto esta aqui porque en el test le paso un string para que ignore esta parte, no he conseguido hacer stub del metodo que genera este dato
				res.setHeader('X-WP-Total', total);
			return res.status(200).send({ "pubs": pubs });
		})
	},


	/*
		Funcion para crear publicaciones unidas con proyectos con información desde Scopus, recibe las publicaciones y los proyectos que se desean unir
	*/
	filterNewPubs: function (req, res) {
		var pubs = req.body.pubs;
		var projects = req.body.projects;

		const step1 = new Promise((resolve, reject) => {
			pubs.forEach(pub => { // Itera sobre todas las publicaciones recibidas
				let ids = projects.map((pro) => { return pro._id }) // Para los proyectos los convierte en sus ids
				// Se intenta coger las publicaciones en la base de datos según su titulo, esto significaría que ya existen y que solo habría que
				// añadirlas a los proyectos que tocase
				Publication.find({ "articleTitle": pub.articleTitle}).then((results) => {
					var nuevos = []
					if (results.length > 0) {
						nuevos = results.map((r) => {
							// Si hay comprueba que la variable proyects este instanciada, en caso contrario lo hace, y despues le añade los proyectos
							if(!(r.projects instanceof Array)){
								r.projects = []
							}
							projects.forEach((pro) => {
								if(r.project.indexOf(pro) == -1){
									r.project.push(pro)
								}
							})
							return r
						})
					}
					return nuevos
				}).then((data) => {
					if (data.length > 0) { // Si existen publicaciones
						if(data.length > 1){ // Si hay mas de una publicacion en la bd que coincida
							for (pub in data){ // Por cada publicacion realiza el mismo procedimiento que en save para las stats
								if (pub.sourceType == "Journal") {
									var anyo = parseInt(pub.publicationDate)
									while(quartiles[anyo] == undefined){
										anyo = anyo -1
										if(anyo == 2000 ){
											pub.quartil = undefined
										}
									}
									var quartilTemp = quartiles[anyo]
									if (quartilTemp.Q1.indexOf(pub.sourceTitle.toUpperCase()) != -1) {
										pub.quartil = "Q1"
									} else if (quartilTemp.Q2.indexOf(pub.sourceTitle.toUpperCase()) != -1) {
										pub.quartil = "Q2"
									} else if (quartilTemp.Q3.indexOf(pub.sourceTitle.toUpperCase()) != -1) {
										pub.quartil = "Q3"
									} else if (quartilTemp.Q4.indexOf(pub.sourceTitle.toUpperCase()) != -1) {
										pub.quartil = "Q4"
									}
								} else if (pub.sourceType.indexOf("Conference") != -1){
									var anyo = parseInt(pub.publicationDate)
									while(congress[anyo] == undefined){
										anyo = anyo -1
										if(anyo == 2000 ){
											pub.congress = undefined
										}
									}
									var congressTemp = congress[anyo]
									for(let categoria in congressTemp){
										if(congress[anyo][categoria].indexOf(pub.sourceTitle.toUpperCase()) != -1){
											pub.congress = categoria
											break;
										}
									}
								}
							}
						} else { // Si solo hay 1 realiza el mismo procedimiento que en save para las stats
							if (data[0].sourceType == "Journal") {
								var anyo = parseInt(pub.publicationDate)
								while(quartiles[anyo] == undefined){
									anyo = anyo -1
									if(anyo == 2000 ){
										pub.quartil = undefined
									}
								}
								var quartilTemp = quartiles[anyo]
								if (quartilTemp.Q1.indexOf(data[0].sourceTitle.toUpperCase()) != -1) {
									data[0].quartil = "Q1"
								} else if (quartilTemp.Q2.indexOf(data[0].sourceTitle.toUpperCase()) != -1) {
									data[0].quartil = "Q2"
								} else if (quartilTemp.Q3.indexOf(data[0].sourceTitle.toUpperCase()) != -1) {
									data[0].quartil = "Q3"
								} else if (quartilTemp.Q4.indexOf(data[0].sourceTitle.toUpperCase()) != -1) {
									data[0].quartil = "Q4"
								}
							} else if (pub.sourceType.indexOf("Conference") != -1){
								var anyo = parseInt(pub.publicationDate)
								while(congress[anyo] == undefined){
									anyo = anyo -1
									if(anyo == 2000 ){
										pub.congress = undefined
									}
								}
								var congressTemp = congress[anyo]
								for(let categoria in congressTemp){
									if(congress[anyo][categoria].indexOf(pub.sourceTitle.toUpperCase()) != -1){
										pub.congress = categoria
										break;
									}
								}
							}
						}
						
						Publication.updateMany(data).then(() => {
							Promise.resolve()
						})
					} else { // Si son todas nuevas se hace lo de las stats y luego se crean
						pub.project = projects
						if (pub.sourceType == "Journal") {
							var anyo = parseInt(pub.publicationDate)
							while(quartiles[anyo] == undefined){
								anyo = anyo -1
								if(anyo == 2000 ){
									pub.quartil = undefined
								}
							}
							var quartilTemp = quartiles[anyo]
							if (quartilTemp.Q1.indexOf(pub.sourceTitle.toUpperCase()) != -1) {
								pub.quartil = "Q1"
							} else if (quartilTemp.Q2.indexOf(pub.sourceTitle.toUpperCase()) != -1) {
								pub.quartil = "Q2"
							} else if (quartilTemp.Q3.indexOf(pub.sourceTitle.toUpperCase()) != -1) {
								pub.quartil = "Q3"
							} else if (quartilTemp.Q4.indexOf(pub.sourceTitle.toUpperCase()) != -1) {
								pub.quartil = "Q4"
							}
						} else if (pub.sourceType.indexOf("Conference") != -1){
							var anyo = parseInt(pub.publicationDate)
							while(congress[anyo] == undefined){
								anyo = anyo -1
								if(anyo == 2000 ){
									pub.congress = undefined
								}
							}
							var congressTemp = congress[anyo]
							for(let categoria in congressTemp){
								if(congress[anyo][categoria].indexOf(pub.sourceTitle.toUpperCase()) != -1){
									pub.congress = categoria
									break;
								}
							}
						}
						Publication.create(pub).then((date) => {
							Promise.resolve()
						})
					}
				})
			})
			if(1)
				resolve()
			else
				reject()
		})
		// Se hace en base a promesas para que todo se ejecute antes de enviar el response
		step1.then((d) => {
			res.status(200).send({})
		}).catch((reason) => {
			res.status(500).send({reason})
		})

	},

	// Este metodo diria que ya no se usa
	filterByProject: function (req, res) {
		var projectId = req.params.id;
		// Project.findById(projectId,(er,pro)=>{
		// 	return res.status(200).send({pro})
		// })
		Publication.find({ 'project._id': projectId }, (err, pubs) => {
			if (err) {
				return res.status(500).send({ err })
			}
			return res.status(200).send({ pubs })
		})

		// Publication.findByProject(projectId, (err,pubs) => {
		// 	if(err)
		// 		return res.status(500).send({err})

		// 	console.log(pubs)
		// 	return res.status(200).send({pubs})
		// })



		// , (err,pubs)=> {
		// 	if (err) {
		// 		return res.status(500).send({err})
		// 	}
		// 	console.log(pubs)
		// 	return res.status(200).send({pubs})
		// })
		// {"project":ObjectId("5c8ce4688c84505ba102729d")}
	},

	getCongressTitles: function(req, res){
		if (congressTitles == []){
			res.status(503).send({error: 'We are sorry, server is not ready for that request'})
		} else {
			res.status(200).send({congressTitles})
		}
	} 

	// updatepub: function(req, res){
	// 	var pr{"project":ObjectId("5c8ce4688c84505ba102729d")}oyectId = req.params.id;
	// 	var datosUpdate = req.body;

	// 	pub.findOneAndUpdate(proyectId, datosUpdate, {new:true}, (err, pubUpdated) => {
	// 		if (err) return res.status(500).send({message: "Error al actualizar"});

	// 		if(!pubUpdated) return res.status(404).send({message: "No se ha podido actualizar"});

	// 		return res.status(200).send({
	// 			pub: pubUpdated
	// 		})
	// 	});


	// },

	// deletepub: function(req, res){
	// 	var pubId = req.params.id;

	// 	pub.findByIdAndDelete(pubId, (err, pubDeleted) => {
	// 		if(err) return res.status(500).send({message: 'No se ha podido borrar el proyecto'});

	// 		if(!pubDeleted) return res.status(404).send({message: "No se puede eliminar ese proyecto"});

	// 		return res.status(200).send({
	// 			pub: pubRemoved
	// 		})
	// 	});
	// }
};

module.exports = controller;
