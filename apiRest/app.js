'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var app = express();


//rutas
var users_routes = require('./routes/users');




app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//configurar cabeceras http



//rutas base
 
app.use('/api',users_routes);

 


module.exports=app;
