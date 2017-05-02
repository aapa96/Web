'use strict'
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/users');

function pruebas(req,res){
	res.status(200).send({
		message:"Controlador de usuario listo"
	});
}

function saveUser(req,res){
	var user = User();
	var params = req.body;
	console.log(params);

	user.name = params.name;
	user.surname = params.surname;
	user.email = params.email;
	user.birthday = 'null';
	user.phone = params.phone;
	user.role = 'ROLE_USER';

 	if(params.password){
		//encriptar contrase;a
		bcrypt.hash(params.password,null,null,function(err,hash){
			user.password = hash;
			if (user.name != null && user.surname != user.email != null && user.phone != null) {
				// Guardar Usuario
				user.save((err,userStored)=>{
					if (err) {
						// statement
						res.status(500).send({message:"Error al guardar usuario"});
					} else {
						// statement
						if (condition) {
							// statement
						} else {
							// statement
						}
					}
				});
			} else {
				res.status(200).send({message:"Introduce todos los campos"});
			}
		});
	}else{
		res.status(200).send({message:"Introduce la contrasena"});
	}
}

module.exports = {

	pruebas,
	saveUser

};