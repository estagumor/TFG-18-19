'use strict' // Para usar cosas buenas de js
// 200 -> OK, 201 -> Created, 400 -> Bad Request, 500 -> Internal Server Error, 503 -> Service Unavailable
// var xml = require('xml');
var fs = require('fs')


var controller = {

	fakeCall: function (req, res) {
        let xml
        fs.readFile( __dirname+ '/scopus.xml', (err, data) => {
            if(data){
                xml = data
                res.type("application/xml")
                res.send(xml);
            } else {
                res.send(err)
            }
        })
        
    }
};

module.exports = controller;