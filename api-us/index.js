const express = require("express");
const app = express();

app.post('/scopus', function (req, res) {
  //Cogemos los datos a usar del post
  let url = "https://api.elsevier.com/content/search/scopus?query="
  let apiKey = "f7f75a8f1e48b03f87da28cc8eb055b7"
  let authors = req.body['authors']
  let startDateProject = req.body['date']
  let start = req.body['start']
  let count = req.body['count']

  //Creamos la url
  let finalUrl = url
  authors.forEach((n, index) => {
    finalUrl = finalUrl + "AU-ID(" + n + ")"
    if (index < authors.length - 1)
      finalUrl = finalUrl + "%20OR%20"
  });

  finalUrl = finalUrl + "%20AND%20PUBYEAR%20%3E%20" + (startDateProject.getFullYear() - 1) + "%20OR%20PUBYEAR%20%3D%20" + (startDateProject.getFullYear() - 1) + "&apiKey=" + apiKey + "&start=" + start + "&count=" + count

  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if(xmlHttp.readyState == 4 && xmlHttp.status==200) {
      res.send(xmlHttp.responseText);
    } else {
      res.status(404).send('No se ha realizado bien la petición.')
    }
  }
  xmlHttp.open("GET",finalUrl, true); //Hace la peticion asincrona
  xmlHttp.send(null);
});

app.get('/', function (req, res) {
  res.send('Se encuentra en la API para obtener información desde Scopus.');
});

app.listen(3080, () => {
  console.log("El servidor está inicializado en el puerto 3080.");
});
