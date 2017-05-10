'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;



mongoose.connect('localhost:27017/soccerfield',(err,res) =>{
	if(err){
		throw  err;
	}else{
		console.log("La base de datos esta corriendo");
		app.listen(port,function(){
			console.log("Servidor Corriendo");
		});
	}


}); 