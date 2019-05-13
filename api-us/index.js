const express = require("express");
const app = express();
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// app.post('/scopus', function (req, res) {
app.get('/scopus', function (req, res) {
  //Cogemos los datos a usar del post
  console.log(req.body)
  let url = "https://api.elsevier.com/content/search/scopus?query="
  let apiKey = "f7f75a8f1e48b03f87da28cc8eb055b7"
  // let authors = req.body['authors']
  let authors = ["15021461000","22333640600"]
  // let startDateProject = req.body['date']
  let startDateProject = new Date("01-01-2017")
  // let start = req.body['start']
  let start = 0
  // let count = req.body['count']
  let count = 25

  //Creamos la url
  let finalUrl = url
  authors.forEach((n, index) => {
    finalUrl = finalUrl + "AU-ID(" + n + ")"
    if (index < authors.length - 1)
      finalUrl = finalUrl + "%20OR%20"
  });

  finalUrl = finalUrl + "%20AND%20PUBYEAR%20%3E%20" + (startDateProject.getFullYear() - 1) + "%20OR%20PUBYEAR%20%3D%20" + (startDateProject.getFullYear() - 1) + "&apiKey=" + apiKey + "&start=" + start + "&count=" + count
  console.log(finalUrl)
  var xmlHttp = new XMLHttpRequest(); //Declara la variable
  xmlHttp.open("GET",finalUrl); //Abre la conexion con la url y método GET
  xmlHttp.send(); //Envia la petición
  xmlHttp.onload = function() { //Cuando se ha cargado la petición entra a este metodo
    if(xmlHttp.readyState == 4 && xmlHttp.status == 200) { //Comprueba que el stado y el status estén bien
      console.log(xmlHttp)
      res.send(xmlHttp.responseText["search-results"]); //devuelve el resultado
    } else {
      res.status(500).send('Ha habido un error en la petición.')
    }
  };
});

app.get('/', function (req, res) {
  res.send('Se encuentra en la API para obtener información desde Scopus.');
});

app.listen(3080, () => {
  console.log("El servidor está inicializado en el puerto 3080.");
});
